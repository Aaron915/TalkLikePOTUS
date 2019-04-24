import { declineGameError } from './../../utils/errorCodes'
import { clearGames, removeGame } from './../../actions/dataActions'
import { NextPageParams } from './../../types/gamesList'
import { getAtEndOfGames, getNextPageParams, getIsFetchingGames } from './../../selectors/gamesListSelectors'
import { select, call, put, takeLatest, throttle } from 'redux-saga/effects'
import { clearNextPageParams, setNextPageParams, setAtEndOfGames, setGetGamesError, fetchGames, resetState, setIsFetchingGames, declineGame } from './../../actions/gamesListActions'
import { getAPI, postAPI } from '../api'
import { fetchNextGamesSaga, gamesListSaga, declineGameSaga } from '../gamesListSagas'
import { loadJSON } from '../../mockData/loadJSON'
import { addGames } from '../../actions/dataActions'
import { recordError } from '../../utils/errorUtils'

jest.mock('react-native-firebase', () => {
    return {
        fabric: {
            crashlytics: () => {
                return {
                    recordError: () => {},
                    log: () => {}
                }
            }
        }
    }
})

describe('fetching games from api', () => {
    it('should be able to a request to get a list of games', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        const gamesResponse = loadJSON('games_list_response')
        expect(fetchGamesSaga.next().value).toEqual(select(getIsFetchingGames))
        expect(fetchGamesSaga.next().value).toEqual(put(setIsFetchingGames(true)))
        expect(fetchGamesSaga.next().value).toEqual(select(getAtEndOfGames))
        expect(fetchGamesSaga.next(false).value).toEqual(select(getNextPageParams))
        expect(fetchGamesSaga.next().value).toEqual(call(getAPI, 'user/games', undefined))
        const updatedAt = gamesResponse.response.updatedAt
        const pageLimit = gamesResponse.response.pageLimit
        const pageNumber = gamesResponse.response.pageNumber
        expect(fetchGamesSaga.next(gamesResponse).value).toEqual(put(setNextPageParams(updatedAt, pageLimit, pageNumber)))
        expect(fetchGamesSaga.next().value).toEqual(put(addGames(gamesResponse.response.games)))
        expect(fetchGamesSaga.next().value).toEqual(put(setIsFetchingGames(false)))
        expect(fetchGamesSaga.next().value).toBeUndefined()
    })

    it('should get the next page of games if available', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        const nextParams: NextPageParams = {
            updatedAt: 12344,
            pageLimit: 20,
            pageNumber: 2
        }
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next(false)
        expect(fetchGamesSaga.next(nextParams).value).toEqual(call(getAPI, 'user/games', nextParams))
    })

    it('should return if the user is at the end of their games', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        expect(fetchGamesSaga.next(true).value).toEqual(put(setIsFetchingGames(false)))
    })

    it('should set the at ends flag if there are no more games', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        const gamesResponse = loadJSON('games_list_response')
        gamesResponse.response.updatedAt = undefined
        gamesResponse.response.pageLimit = undefined

        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next(false)
        fetchGamesSaga.next()
        expect(fetchGamesSaga.next(gamesResponse).value).toEqual(put(clearNextPageParams()))
        expect(fetchGamesSaga.next().value).toEqual(put(setAtEndOfGames(true)))
        expect(fetchGamesSaga.next().value).toEqual(put(addGames(gamesResponse.response.games)))
    })

    it('should throw an error if something goes wrong', () => {
        const error = {
            test: 'test'
        }
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        fetchGamesSaga.next(false)
        fetchGamesSaga.next()
        expect(fetchGamesSaga.throw(error).value).toEqual(put(setGetGamesError(error)))
    })

    it('should clear all of the state properly if told to reset the state', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames(true))
        const gamesResponse = loadJSON('games_list_response')
        fetchGamesSaga.next()
        fetchGamesSaga.next()
        expect(fetchGamesSaga.next().value).toEqual(put(resetState()))
        fetchGamesSaga.next()
        fetchGamesSaga.next(false)
        fetchGamesSaga.next()
        const updatedAt = gamesResponse.response.updatedAt
        const pageLimit = gamesResponse.response.pageLimit
        fetchGamesSaga.next(gamesResponse)
        expect(fetchGamesSaga.next().value).toEqual(put(clearGames()))
    })

    it('should stop if games are already being fetched', () => {
        const fetchGamesSaga = fetchNextGamesSaga(fetchGames())
        fetchGamesSaga.next()
        expect(fetchGamesSaga.next(true).value).toBeUndefined()
    })
})

describe('declining a game', () => {
    it('should decline a game correctly', () => {
        const gameId = '5a348d92e7dd8a18400585e3'
        const declineGameAction = declineGame(gameId)
        const saga = declineGameSaga(declineGameAction)
        const gameResponse = loadJSON('new_game_response')
        expect(saga.next().value).toEqual(call(postAPI, 'game/decline', { gameId }))
        expect(saga.next(gameResponse).value).toEqual(put(removeGame('5a348d92e7dd8a18400585e3')))
    })

    it('should throw an error if something goes wrong', () => {
        const gameId = '5a348d92e7dd8a18400585e3'
        const declineGameAction = declineGame(gameId)
        const saga = declineGameSaga(declineGameAction)
        const err = 'err'
        saga.next()
        expect(saga.throw(err).value).toEqual(call(recordError, declineGameError, err))
    })
})

describe('listening for actions', () => {
    it('should listen for all actions', () => {
        const listen = gamesListSaga()
        expect(listen.next().value).toEqual(throttle(2000, fetchGames.toString(), fetchNextGamesSaga))
        expect(listen.next().value).toEqual(takeLatest(declineGame.toString(), declineGameSaga))
        expect(listen.next().value).toBeUndefined()
    })
})
