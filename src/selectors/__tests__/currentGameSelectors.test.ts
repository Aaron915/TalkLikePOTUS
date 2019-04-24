import { State } from './../../types/state'
import { Game } from './../../types/models'
import {
    getStartGameError,
    getCurrentGameID,
    getCurrentGame,
    getCurrentGameStartErrorBadUserName,
    getWaitingForRandomOpponent
} from './../currentGameSelectors'

import { loadJSON } from '../../mockData/loadJSON'
it('should be able to access the start game error', () => {
    // Shouldnt matter what type the error is.
    const error = 'Error'
    const state = {
        currentGame: {
            startGameError: error
        }
    } as State

    expect(getStartGameError(state)).toEqual(error)
})

it('should be able to access the current game', () => {
    const game = loadJSON('game') as Game
    const state = {
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State
    expect(getCurrentGameID(state)).toEqual(game._id)
    expect(getCurrentGame(state)).toEqual(game)
})

it('should not throw an exception if the state was not properly passed', () => {
    const state = undefined
    const noCurrentGame = {} as State
    expect(getCurrentGameID(state)).toBeUndefined()
    expect(getCurrentGameID(noCurrentGame)).toBeUndefined()
})

describe('determining if there was a username error', () => {
    it('should return true if there was an error', () => {
        const state = {
            currentGame: {
                startGameError: {
                    meta: {
                        code: 400,
                        status: 'error_fetching_user'
                    }
                }
            }
        } as State
        expect(getCurrentGameStartErrorBadUserName(state)).toEqual(true)
    })

    it('should return false if there is no error', () => {
        const state = {
            currentGame: {
                startGameError: {
                    meta: {
                        code: 501,
                        status: 'error_fetching_user'
                    }
                }
            }
        } as State
        expect(getCurrentGameStartErrorBadUserName(state)).toEqual(false)
    })

    it('should return undefined if there was no error', () => {
        const state = {} as State
        expect(getCurrentGameStartErrorBadUserName(state)).toBeUndefined()
    })
})

it('should be able to get the waiting for opponent flag', () => {
    const state = {
        currentGame: {
            waitingForRandomOpponent: true
        }
    } as State
    expect(getWaitingForRandomOpponent(state)).toEqual(true)
})