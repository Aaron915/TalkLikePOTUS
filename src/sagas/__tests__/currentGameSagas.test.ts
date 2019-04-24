import { getCurrentGameID } from './../../selectors/currentGameSelectors'
import { getUserID } from './../../selectors/dataSelectors'
import { _getRoundWinNumbers } from './../../selectors/gameSelectors'
import { startGameWithUsername, setWaitingForRandomOpponent, startRandomGame, retrieveCurrentGame, forfeitUser, forfeitOpponent } from './../../actions/currentGameActions'
import { addGame } from './../../actions/dataActions'
import { gameSagas, startGameWithUserSaga, startGameWithFacebookFriend, startGameWithRequestBody, startGameWithUserNameSaga, startRandomGameSaga, retrieveCurrentGameSaga, handleCurrentGameResponse, forfeitUserSaga, forfeitOpponentSaga, forfeitPlayer } from '../currentGameSagas'
import { takeLatest, call, put, select} from 'redux-saga/effects'
import {
    startGameWithUser,
    startGameWithFriend,
    setCurrentGameID,
    setStartGameError
 } from '../../actions/currentGameActions'
import { postAPI, getAPI } from '../api'
import { loadJSON } from '../../mockData/loadJSON'
import { getGameOpponentID } from '../../selectors/gameSelectors'

it('should listen for all of the actions', () => {
    const saga = gameSagas()
    expect(saga.next().value).toEqual(takeLatest(forfeitOpponent.toString(), forfeitOpponentSaga))
    expect(saga.next().value).toEqual(takeLatest(forfeitUser.toString(), forfeitUserSaga))
    expect(saga.next().value).toEqual(takeLatest(retrieveCurrentGame.toString(), retrieveCurrentGameSaga))
    expect(saga.next().value).toEqual(takeLatest(startGameWithUser.toString(), startGameWithUserSaga))
    expect(saga.next().value).toEqual(takeLatest(startRandomGame.toString(), startRandomGameSaga))
    expect(saga.next().value).toEqual(takeLatest(startGameWithUsername.toString(), startGameWithUserNameSaga))
    expect(saga.next().value).toEqual(takeLatest(startGameWithFriend.toString(), startGameWithFacebookFriend))
    expect(saga.next().value).toBeUndefined()
})

it('should be able to start a game from a facebook id', () => {
    const action = startGameWithFriend(`10155838103539265`)
    const saga = startGameWithFacebookFriend(action)
    expect(saga.next().value).toEqual(call(startGameWithRequestBody, { facebookId: `10155838103539265`}))
})

it('should be able to handle starting a game with a username', () => {
    const username = 'patriotsFan1975'
    const action = startGameWithUsername(username)
    const saga = startGameWithUserNameSaga(action)
    expect(saga.next().value).toEqual(call(startGameWithRequestBody, { username }))
})

it('should be able to start a game with an opponent id', () => {
    const opponentId = '1234'
    const action = startGameWithUser(opponentId)
    const saga = startGameWithUserSaga(action)
    expect(saga.next().value).toEqual(call(startGameWithRequestBody, { opponentId }))
})
it('should be able to handle starting a new game from a request body', () => {
    const body = {
        facebookId: `120937442026979`
    }
    const saga = startGameWithRequestBody(body)
    expect(saga.next().value).toEqual(put(setStartGameError(undefined)))
    expect(saga.next().value).toEqual(put(setWaitingForRandomOpponent(false)))
    expect(saga.next().value).toEqual(call(postAPI, 'user/createGame', body))
    const response = loadJSON('new_game_response')
    console.log(response)
    expect(saga.next(response).value).toEqual(call(handleCurrentGameResponse, response))
})

it('should handle if there is an error', () => {
    const body = {
        facebookId: `120937442026979`
    }
    const saga = startGameWithRequestBody(body)
    const error = {
        test: 'test'
    }
    saga.next()
    saga.next()
    saga.next()
    expect(saga.throw(error).value).toEqual(put(setStartGameError(error)))
})

it('should be able to update the state if the user is waiting for an opponent', () => {
    const response = loadJSON('waiting_for_opponent')
    const saga = startGameWithRequestBody({})
    saga.next()
    saga.next()
    saga.next()
    expect(saga.next(response).value).toEqual(put(setWaitingForRandomOpponent(true)))
})

it('should make a game request with an empty body for a random game', () => {
    const saga = startRandomGameSaga()
    expect(saga.next().value).toEqual(call(startGameWithRequestBody, {}))
})

it('should be able to handle a current game response correctly', () => {
    const response = loadJSON('new_game_response')
    const game = response.response.game
    const gameId = game._id
    const saga = handleCurrentGameResponse(response)
    expect(saga.next().value).toEqual(put(addGame(game)))
    expect(saga.next().value).toEqual(put(setCurrentGameID(game._id)))
})

describe('retrieving the current game', () => {
    it('should be able retrieve a new current game', () => {
        const response = loadJSON('new_game_response')
        const gameId = response.response.game._id
        const action = retrieveCurrentGame(gameId)
        const saga = retrieveCurrentGameSaga(action)
        expect(saga.next().value).toEqual(put(setStartGameError(undefined)))
        expect(saga.next().value).toEqual(call(getAPI, 'user/game', {gameId}))
        expect(saga.next(response).value).toEqual(call(handleCurrentGameResponse, response))
        expect(saga.next().value).toBeUndefined()
    })

    it('should throw an error if something goes wrong', () => {
        const response = loadJSON('new_game_response')
        const gameId = response.response.game._id
        const action = retrieveCurrentGame(gameId)
        const saga = retrieveCurrentGameSaga(action)
        expect(saga.next().value).toEqual(put(setStartGameError(undefined)))
        expect(saga.next().value).toEqual(call(getAPI, 'user/game', {gameId}))
        expect(saga.throw('err').value).toEqual(put(setStartGameError('err')))
    })
})

describe('forfeiting a game', () => {
    it('should allow the user to forfeit', () => {
        const saga = forfeitUserSaga()
        const userId = '123444'
        expect(saga.next().value).toEqual(select(getUserID))
        expect(saga.next(userId).value).toEqual(call(forfeitPlayer, userId))
    })

    it('should allow the user to forfeit their opponent', () => {
        const saga = forfeitOpponentSaga()
        const userId = '123444'
        expect(saga.next().value).toEqual(select(getGameOpponentID))
        expect(saga.next(userId).value).toEqual(call(forfeitPlayer, userId))
    })

    it('should allow a player to be forfeited', () => {
        const userId = '3434'
        const gameId = '1354656'
        const response = loadJSON('new_game_response')

        const saga = forfeitPlayer(userId)
        expect(saga.next().value).toEqual(select(getCurrentGameID))
        expect(saga.next(gameId).value).toEqual(call(postAPI, 'game/forfeit', { userId, gameId}))
        expect(saga.next(response).value).toEqual(put(addGame(response.response.game)))
        expect(saga.next().value).toBeUndefined()
    })
})
