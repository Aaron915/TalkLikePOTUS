import { CurrentGameState } from './../../types/state'
import { setCurrentGameID, setStartGameError, setWaitingForRandomOpponent, resetCurrentGame } from './../../actions/currentGameActions'
import currentGameReducer from '../currentGameReducer'

it('should allow the user to set the current game id', () => {
    const state = {}
    const id = '123123'
    const newState = currentGameReducer(state, setCurrentGameID(id))
    expect(newState.gameId).toEqual(id)
})

it('should be able to clear an error', () => {
    const state = {
        startGameError: 'adfsdf'
    }
    const newState = currentGameReducer(state, setStartGameError(undefined))
    expect(newState.startGameError).toBeUndefined()
})

it('should be able to set an error', () => {
    const state = {
        startGameError: undefined
    }
    const error = 'error'
    const newState = currentGameReducer(state, setStartGameError(error))
    expect(newState.startGameError).toBe(error)
})

it('should be able to update the state of the random opponent', () => {
    const state: CurrentGameState = {
        waitingForRandomOpponent: false
    }
    const newState = currentGameReducer(state, setWaitingForRandomOpponent(true))
    expect(newState.waitingForRandomOpponent).toEqual(true)
})

it('should be able to reset all the current game state', () => {
    const state: CurrentGameState = {
        gameId: 'sdf',
        startGameError: 'test',
        waitingForRandomOpponent: true
    }
    const newState = currentGameReducer(state, resetCurrentGame())
    expect(newState.gameId).toBeUndefined()
    expect(newState.startGameError).toBeUndefined()
    expect(newState.waitingForRandomOpponent).toEqual(false)
})