import { getGames } from './dataSelectors'
import { Game } from './../types/models'
import {
    State
} from '../types/state'
import { createSelector } from 'reselect'

export const getStartGameError = (state: State) => state && state.currentGame && state.currentGame.startGameError
export const getWaitingForRandomOpponent = (state: State) => state.currentGame.waitingForRandomOpponent
export const getCurrentGameID = (state: State) => state && state.currentGame && state.currentGame.gameId
export const getCurrentGame: (state: State) => Game | undefined = createSelector(
    getGames,
    getCurrentGameID,
    (games: Game[], currentGameID: string) => {
        return games.find(game => game._id === currentGameID)
    }
)

export const getCurrentGameStartErrorBadUserName: (state: State) => Boolean = createSelector(
    getStartGameError,
    (error: any) => {
        return error && error.meta && error.meta.code === 400
    }
)
