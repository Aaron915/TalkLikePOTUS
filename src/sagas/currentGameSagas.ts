import { getGameOpponentID } from './../selectors/gameSelectors'
import { getCurrentGameID } from './../selectors/currentGameSelectors'
import { getUserID } from './../selectors/dataSelectors'
import { APIResponse } from './../types/api'
import { setStartGameError } from './../actions/currentGameActions'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
    startGameWithUser,
    startGameWithFriend,
    startGameWithUsername,
    setCurrentGameID,
    startRandomGame,
    setWaitingForRandomOpponent,
    retrieveCurrentGame,
    forfeitUser,
    forfeitOpponent
} from '../actions/currentGameActions'
import { addGame } from '../actions/dataActions'
import { postAPI, getAPI } from './api'

export function* startGameWithFacebookFriend(action) {
    const postBody = {
        facebookId: action.payload
    }
    yield call(startGameWithRequestBody, postBody)
}

export function* startGameWithUserNameSaga(action) {
    const postBody = {
        username: action.payload
    }
    yield call(startGameWithRequestBody, postBody)
}

export function* startRandomGameSaga() {
    yield call(startGameWithRequestBody, {})
}

export function* startGameWithUserSaga(action) {
    const postBody = {
        opponentId: action.payload
    }
    yield call(startGameWithRequestBody, postBody)
}

export function* retrieveCurrentGameSaga(action) {
    const gameId = action.payload
    const body = {
        gameId
    }
    yield put(setStartGameError(undefined))
    try {
        const response: APIResponse = yield call(getAPI, 'user/game', body)
        yield call(handleCurrentGameResponse, response)
    } catch (err) {
        yield put(setStartGameError(err))
    }
}

export function* startGameWithRequestBody(body: any) {
    yield put(setStartGameError(undefined))
    yield put(setWaitingForRandomOpponent(false))
    try {
        const response: APIResponse = yield call(postAPI, 'user/createGame', body)

        if (!response.response && response.meta.status === 'waiting_for_user') {
            yield put(setWaitingForRandomOpponent(true))
            return undefined
        }
        yield call(handleCurrentGameResponse, response)
    } catch (err) {
        yield put(setStartGameError(err))
    }
}

export function* handleCurrentGameResponse(response: APIResponse) {
    const game = response.response.game
    yield put(addGame(game))
    yield put(setCurrentGameID(game._id))
}

export function* forfeitUserSaga() {
    const userId = yield select(getUserID)
    yield call(forfeitPlayer, userId)
}

export function* forfeitOpponentSaga() {
    const userId = yield select(getGameOpponentID)
    yield call(forfeitPlayer, userId)
}

export function* forfeitPlayer(userId: string) {
    const gameId = yield select(getCurrentGameID)
    const body = {
        gameId,
        userId
    }
    try {
        const response = yield call(postAPI, 'game/forfeit', body)
        if (response.response.game) {
            yield put(addGame(response.response.game))
        }
    } catch (err) {
        console.warn(JSON.stringify(err))
    }
}

export function* gameSagas() {
    yield takeLatest(forfeitOpponent.toString(), forfeitOpponentSaga)
    yield takeLatest(forfeitUser.toString(), forfeitUserSaga)
    yield takeLatest(retrieveCurrentGame.toString(), retrieveCurrentGameSaga)
    yield takeLatest(startGameWithUser.toString(), startGameWithUserSaga)
    yield takeLatest(startRandomGame.toString(), startRandomGameSaga)
    yield takeLatest(startGameWithUsername.toString(), startGameWithUserNameSaga)
    yield takeLatest(startGameWithFriend.toString(), startGameWithFacebookFriend)
}