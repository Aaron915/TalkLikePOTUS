import {
    getGameUserCanPlayMostRecentRound,
    getUserRoundWinsCount,
    getGameOpponentProfilePicture,
    getGameOpponentRoundWinsCount,
    getUserCanDeclineGame,
    getGameWaitingForOpponent,
    GameProps,
    getGameIsOpen,
    getUserTopTurnScore,
    getUserTopTurnText,
    getTopRoundRequiredWords,
    getUserWonGame,
    getGameOpponentFirstName,
    getGameOpponentID,
    getGameDeclined,
    getGameUserForfeited,
    getGameOpponentForfeited
 } from './gameSelectors'
import { Game } from './../types/models'
import { createSelector, createStructuredSelector } from 'reselect'
import { NextPageParams } from './../types/gamesList'
import { State } from '../types/state'
import { getGames, getUserID, getUserProfilePicture, getUserFirstName } from './dataSelectors'
import { gameIsOpen } from '../utils/game/gameUtils'
import { GameSummaryProps, GameSummaryCompletion } from '../screens/tabs/home/gamesList/Components/GameSummary/GameSummary'

export const getAtEndOfGames: (state: State) => boolean = (state) => state.gamesList.atEndOfGames
export const getNextPageParams: (state: State) => NextPageParams = (state) => state.gamesList.nextPageParams
export const getIsFetchingGames: (state: State) => boolean = (state) => state.gamesList.fetchingGames

export const getOpenGames: (state: State) => Game[] = createSelector(
    getGames,
    getUserID,
    (games: Game[], userID: string) => {
        return games.filter((game) => gameIsOpen(game, userID, game.opponent._id))
    }
)

export const getCompletedGames: (state: State) => Game[] = createSelector(
    getGames,
    getUserID,
    (games: Game[], userID: string) => {
        return games.filter((game) => !gameIsOpen(game, userID, game.opponent._id))
    }
)

// Slightly different than endOfGames.
export const getHasNextGameParams: (state: State) => boolean = createSelector(
    getNextPageParams,
    (nextPageParams: NextPageParams) => {
        return nextPageParams !== undefined
    }
)

const getGameCompleteProps: (state, props: GameProps) => GameSummaryCompletion | undefined = createSelector(
    getGameIsOpen,
    getTopRoundRequiredWords,
    getUserTopTurnScore,
    getUserTopTurnText,
    getUserWonGame,
    getGameDeclined,
    (gameOpen: boolean, requiredWords: string[], topTurnScore: number, topTurnText: string[], userWon: boolean, gameDeclined: boolean) => {
        if (gameDeclined || gameOpen) {
            return undefined
        }

        return {
            userTopTurnScore: topTurnScore,
            userTopTurnText: topTurnText,
            requiredWords: requiredWords,
            userWonGame: userWon
        }
    }
)

export const getGameSummaryProps: (state, props: GameProps) => Partial<GameSummaryProps> = createStructuredSelector({
    userName: getUserFirstName,
    userProfilePicture: getUserProfilePicture,
    userRoundsWon: getUserRoundWinsCount,
    userCanPlay: getGameUserCanPlayMostRecentRound,
    opponentName: getGameOpponentFirstName,
    opponentFirstName: getGameOpponentFirstName,
    opponentProfilePicture: getGameOpponentProfilePicture,
    opponentRoundsWon: getGameOpponentRoundWinsCount,
    waitingForOpponent: getGameWaitingForOpponent,
    canDeclineGame: getUserCanDeclineGame,
    gameComplete: getGameCompleteProps,
    opponentID: getGameOpponentID,
    gameDeclined: getGameDeclined,
    userForfeited: getGameUserForfeited,
    opponentForfeited: getGameOpponentForfeited
})