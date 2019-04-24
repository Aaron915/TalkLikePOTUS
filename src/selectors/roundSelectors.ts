import { RoundInterfaceProps } from './roundSelectors'
import { Game, Round, Turn } from './../types/models'
import { getGameOpponentID, getGameOpponentFirstName, getGameForfeited } from './gameSelectors'
import { State } from './../types/state'
import { createSelector } from 'reselect'
import { getUserID } from './dataSelectors'
import { GameProps, getSelectedGame } from './gameSelectors'
import { splitupTextFromRequiredWords, turnForUserID } from '../utils/round/roundUtils'
import { userRoundsWon } from '../utils/game/gameUtils'

export interface RoundInterfaceProps extends GameProps {
    roundNumber?: number
}

export const getRoundNumber = (_state: State, props: RoundInterfaceProps) => props.roundNumber

export const getRound = createSelector(
    getSelectedGame,
    getRoundNumber,
    (game: Game, roundNumber: number) => {
        if (game) {
            return game.rounds[roundNumber - 1]
        } else {
            return undefined
        }
    }
)

export const getRoundRequiredWords: (state: State, props: RoundInterfaceProps) => string[] | undefined = createSelector(
    getRound,
    (round: Round) => {
        return round && round.words && round.words.sort((word1, word2) => word2.length - word1.length)
    }
)

export const getUserTurnForRound: (state: State, props: RoundInterfaceProps) => Turn = createSelector(
    getUserID,
    getRound,
    (userId: string, round: Round) => {
        return userId && round && turnForUserID(round, userId)
    }
)
// Need to test
export const getUserScoreForRound: (state: State, props: RoundInterfaceProps) => number | undefined = createSelector(
    getUserTurnForRound,
    (turn: Turn) => {
        return turn && turn.score
    }
)

export const getUserTextForRound: (state: State, props: RoundInterfaceProps) => string | undefined = createSelector(
    getUserTurnForRound,
    (turn: Turn) => {
        return turn && turn.text
    }
)

export const getUserCanPlayRound: (state: State, props: RoundInterfaceProps) => boolean | undefined = createSelector(
    getUserTurnForRound,
    getGameForfeited,
    (turn: Turn, forfeited: boolean) => {
        return turn === undefined && !forfeited
    }
)

export const getOpponentTurnForRound: (state: State, props: RoundInterfaceProps) => Turn | undefined = createSelector(
    getGameOpponentID,
    getRound,
    (opponentID: string, round: Round) => {
        const opponentTurn = opponentID && round && turnForUserID(round, opponentID)
        if (opponentTurn) {
            return opponentTurn
        }

        return undefined
    }
)

export const getOpponentScoreForRound: (state: State, props: RoundInterfaceProps) => number | undefined = createSelector(
    getOpponentTurnForRound,
    (turn: Turn) => {
        return turn && turn.score
    }
)

export const getOpponentTextForRound: (state: State, props: RoundInterfaceProps) => string | undefined = createSelector(
    getOpponentTurnForRound,
    (turn: Turn) => {
        return turn && turn.text
    }
)

export const getHideOpponentText: (state: State, props: RoundInterfaceProps) => boolean | undefined = createSelector(
    getUserTurnForRound,
    getOpponentTurnForRound,
    (userTurn: Turn, opponentTurn: Turn) => {
        return userTurn === undefined || opponentTurn === undefined
    }
)

export const getWaitingForOpponent: (state: State, props: RoundInterfaceProps) => string | undefined = createSelector(
    getOpponentTurnForRound,
    getUserTurnForRound,
    getGameOpponentFirstName,
    (opponentTurn: Turn, userTurn: Turn, opponentName: string) => {
        if (!opponentTurn && userTurn) {
            return `Waiting for ${opponentName}...`
        }

        return undefined
    }
)

export const getUserWonRound: (state: State, props: RoundInterfaceProps) => boolean | undefined = createSelector(
    getUserScoreForRound,
    getOpponentScoreForRound,
    (userScore: number, opponentScore: number) => {
        return userScore && opponentScore && userScore > opponentScore
    }
)

export const getOpponentWonRound: (state: State, props: RoundInterfaceProps) => boolean | undefined = createSelector(
    getUserScoreForRound,
    getOpponentScoreForRound,
    (userScore: number, opponentScore: number) => {
        return userScore && opponentScore && userScore <= opponentScore
    }
)

export const getOpponentSplitupText: (state: State, props: RoundInterfaceProps) => string[] | undefined = createSelector(
    getOpponentTextForRound,
    getRoundRequiredWords,
    (text?: string, requiredWords?: string[]) => {
        const splitupText = splitupTextFromRequiredWords(text, requiredWords)
        return splitupText
    }
)

export const getUserSplitupText: (state: State, props: RoundInterfaceProps) => string[] | undefined = createSelector(
    getUserTextForRound,
    getRoundRequiredWords,
    (text?: string, requiredWords?: string[]) => {
        const splitupText = splitupTextFromRequiredWords(text, requiredWords)
        return splitupText
    }
)

export const getOpponentWinsUpToRound: (state: State, props: RoundInterfaceProps) => number | undefined = createSelector(
    getSelectedGame,
    getGameOpponentID,
    getRoundNumber,
    (game: Game, opponentID: string, roundNumber: number) => {
        return game && opponentID && roundNumber && userRoundsWon(game, opponentID, roundNumber)
    }
)

export const getUserWinsUpToRound: (state: State, props: RoundInterfaceProps) => number | undefined = createSelector(
    getSelectedGame,
    getUserID,
    getRoundNumber,
    (game: Game, userID: string, roundNumber: number) => {
        return game && userID && roundNumber && userRoundsWon(game, userID, roundNumber)
    }
)