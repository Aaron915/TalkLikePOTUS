import { CurrentGameState } from './../types/state'
import {
    setCurrentGameID,
    setStartGameError,
    setWaitingForRandomOpponent,
    resetCurrentGame
} from './../actions/currentGameActions'
import { handleActions } from 'redux-actions'

const initialState: CurrentGameState = {
    gameId: undefined,
    startGameError: undefined,
    waitingForRandomOpponent: false
}
export default handleActions({
    [setCurrentGameID](state: CurrentGameState, action): CurrentGameState {
        return { ...state, gameId: action.payload }
    },
    [setStartGameError](state: CurrentGameState, action): CurrentGameState {
        return { ...state, startGameError: action.payload }
    },
    [setWaitingForRandomOpponent](state: CurrentGameState, action): CurrentGameState {
        return { ...state, waitingForRandomOpponent: action.payload }
    },
    [resetCurrentGame](): CurrentGameState {
        return {...initialState}
    }
}, initialState)