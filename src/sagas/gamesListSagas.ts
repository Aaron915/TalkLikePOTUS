import { declineGameError } from './../utils/errorCodes'
import { addGames, clearGames, removeGame } from './../actions/dataActions'
import { setAtEndOfGames, resetState, setIsFetchingGames, clearNextPageParams } from './../actions/gamesListActions'
import { getAtEndOfGames, getNextPageParams, getIsFetchingGames } from './../selectors/gamesListSelectors'
import { takeLatest, select, put, call, throttle } from 'redux-saga/effects'
import { fetchGames, setGetGamesError, setNextPageParams, declineGame } from '../actions/gamesListActions'
import { getAPI, postAPI } from './api'
import { recordError } from '../utils/errorUtils'

export function* fetchNextGamesSaga(action) {
    const clearExistingData = action.payload
    const isFetching = yield select(getIsFetchingGames)
    if (isFetching) {
        return undefined
    }
    yield put(setIsFetchingGames(true))
    if (clearExistingData) {
        yield put(resetState())
    }
    const isAtEnd = yield select(getAtEndOfGames)
    if (isAtEnd) {
        yield put(setIsFetchingGames(false))
        return undefined
    }
    const nextPageParams = yield select(getNextPageParams)
    try {
        const response = yield call(getAPI, 'user/games', nextPageParams)
        if (response.response.updatedAt && response.response.pageLimit && response.response.pageNumber && response.response.games.length === 20) {
            yield put(setNextPageParams(response.response.updatedAt, response.response.pageLimit, response.response.pageNumber))
        } else {
            yield put(clearNextPageParams())
            yield put(setAtEndOfGames(true))
        }
        if (response.response.games) {
            if (clearExistingData) {
                yield put(clearGames())
            }
            yield put(addGames(response.response.games))
        }
    } catch (err) {
        yield put(setGetGamesError(err))
    }
    yield put(setIsFetchingGames(false))
}

export function* declineGameSaga(action) {
    console.log(action)
    try {
        const payload = {
            gameId: action.payload
        }
        const result = yield call(postAPI, 'game/decline', payload)
        if (result.response.game) {
            console.log(result.response.game.toString())
            yield put(removeGame(result.response.game._id))
        } else {
            yield call(recordError, declineGameError, 'didnt receive game in response.')
        }
    } catch (err) {
        yield call(recordError, declineGameError, err)
    }
}

export function* gamesListSaga() {
    yield throttle(2000, fetchGames.toString(), fetchNextGamesSaga)
    yield takeLatest(declineGame.toString(), declineGameSaga)
}