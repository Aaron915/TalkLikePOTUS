import { RoundAndTurn, gameIsOpen, userWonGame, gameDeclined, userCanForfeitOpponent } from './../utils/game/gameUtils'
import { getCurrentGame } from './currentGameSelectors'
import { createSelector } from 'reselect'
import { Game, Opponent, Round } from './../types/models'
import { GameProps } from './gameSelectors'
import { State } from '../types/state'
import { getGames, getUserID } from './dataSelectors'
import { gameOpponent, gameLatestRound, topRoundAndTurnForUserInGame } from '../utils/game/gameUtils'
import { userWonRound, userCanPlayRound, splitupTextFromRequiredWords } from '../utils/round/roundUtils'

// TODO: Maybe move types out?
export interface GameProps {
    // ID of the game.
    _id?: string
}

export const getGameID = (_state: State, gameProps?: GameProps) => gameProps && gameProps._id

const _getGame: (state: State, props: GameProps) => Game | undefined = createSelector(
    getGames,
    getGameID,
    (games: Game[], gameID: string) => {
        return games.filter((game: Game) => game._id === gameID)[0]
    }
)

export const getSelectedGame: (state: State, props?: GameProps) => Game | undefined = createSelector(
    getCurrentGame,
    _getGame,
    (currentGame?: Game, propsGame?: Game) => {
        return propsGame || currentGame
    }
)

export const getGameDeclined: (state: State, props: GameProps) => boolean = createSelector(
    getSelectedGame,
    (game: Game) => {
        return gameDeclined(game)
    }
)

export const getGameIsAvailable: (state: State, props: GameProps) => boolean | undefined = createSelector(
    getSelectedGame,
    (game: Game) => {
        return game !== undefined
    }
)

export const getGameNumberOfRounds: (state: State, props?: GameProps) => number | undefined = createSelector(
    getSelectedGame,
    (game?: Game) => {
        if (game) {
            return game.rounds.length
        } else {
            return undefined
        }
    }
)

export const getGameOpponent: (state: State, props?: GameProps) => Opponent | undefined = createSelector(
    getSelectedGame,
    (game: Game) => {
        return gameOpponent(game)
    }
)
export const getGameOpponentFirstName: (state: State, props?: GameProps) => string | undefined = createSelector(
    getGameOpponent,
    (opponent: Opponent) => {
        return opponent && opponent.firstName
    }
)

export const getGameOpponentFullName: (state: State, props?: GameProps) => string | undefined = createSelector(
    getGameOpponent,
    getGameOpponentFirstName,
    (opponent: Opponent, firstName: string) => {
        return opponent && firstName && opponent.lastName && `${firstName} ${opponent.lastName}`
    }
)

export const getGameOpponentProfilePicture: (state: State, props?: GameProps) => string | undefined = createSelector(
    getGameOpponent,
    (opponent: Opponent) => {
        return opponent && opponent.profilePicture
    }
)

export const getGameOpponentID: (state: State, props?: GameProps) => string | undefined = createSelector(
    getGameOpponent,
    (opponent: Opponent) => {
        return opponent && opponent._id
    }
)

interface RoundWinNumbers {
    user?: number,
    opponent?: number
}

export const getGameForfeitPlayer: (state: State, props: GameProps) => string = createSelector(
    getSelectedGame,
    (game: Game) => {
        if (!game || game.forfeitPlayer === null ) {
            return undefined
        }
        return game.forfeitPlayer
    }
)

export const getGameForfeited: (state: State, props: GameProps) => boolean = createSelector(
    getGameForfeitPlayer,
    (forfeitPlayer: string) => {
        return forfeitPlayer !== null && forfeitPlayer !== undefined
    }
)

export const _getRoundWinNumbers: (state: State, props?: GameProps) => RoundWinNumbers | undefined = createSelector(
    getSelectedGame,
    getUserID,
    getGameOpponentID,
    (game: Game, userID: string, gameOpponentID: string) => {
        if (!game || !userID || !gameOpponentID) {
            return undefined
        }
        const userWins = game.rounds.filter(round => userWonRound(round, userID)).length
        const opponentWins = game.rounds.filter(round => userWonRound(round, gameOpponentID)).length
        return {
            user: userWins,
            opponent: opponentWins
        }
    }
)

export const getUserRoundWinsCount: (state: State, props?: GameProps) => number | undefined = createSelector(
    _getRoundWinNumbers,
    (roundWinNumbers: RoundWinNumbers) => {
        return roundWinNumbers && roundWinNumbers.user
    }
)

export const getGameOpponentRoundWinsCount: (state: State, props?: GameProps) => number | undefined = createSelector(
    _getRoundWinNumbers,
    (roundWinNumbers: RoundWinNumbers) => {
        return roundWinNumbers && roundWinNumbers.opponent
    }
)

export const _getGameMostRecentRound: (state: State, props?: GameProps) => Round | undefined = createSelector(
    getSelectedGame,
    (game: Game) => {
        return gameLatestRound(game)
    }
)

export const getGameUserCanPlayMostRecentRound: (state: State, props?: GameProps) => boolean | undefined = createSelector(
    _getGameMostRecentRound,
    getUserID,
    getGameDeclined,
    getGameForfeited,
    (round: Round, userID: string, declined: boolean, forfeited: boolean) => {
        return round && userID && userCanPlayRound(round, userID, declined, forfeited)
    }
)

export const getGameOpponentCanPlayMostRecentRound: (state: State, props?: GameProps) => boolean | undefined = createSelector(
    _getGameMostRecentRound,
    getGameOpponentID,
    getGameDeclined,
    getGameForfeited,
    (round: Round, opponentID: string, declined: boolean, forfeited: boolean) => {
        return userCanPlayRound(round, opponentID, declined, forfeited)
    }
)

const _getUserStartedGame: (state: State, props?: GameProps) => boolean | undefined = createSelector(
    getSelectedGame,
    (game: Game) => {
        return game && game.creator
    }
)

const _getUserHasPlayedTurn: (state: State, props?: GameProps) => boolean | undefined = createSelector(
    getSelectedGame,
    getUserID,
    (game: Game, userID: string) => {
        return game && game.rounds && game.rounds.length > 0 && !userCanPlayRound(game.rounds[0], userID, false, false)
    }
)

export const getUserCanDeclineGame: (state: State, props: GameProps) => boolean = createSelector(
    _getUserStartedGame,
    _getUserHasPlayedTurn,
    getGameForfeited,
    (startedGame: boolean, playedATurn: boolean, forfeited: boolean) => {
        return !startedGame && !playedATurn && !forfeited
    }
)

export const getGameWaitingForOpponent: (state: State, props: GameProps) => boolean = createSelector(
    _getGameMostRecentRound,
    getUserID,
    getGameOpponentID,
    getGameDeclined,
    getGameForfeited,
    (round: Round, userID: string, opponentID: string, declined: boolean, forfeited: boolean) => {
        if (!round || !userID || !opponentID) {
            return undefined
        }
        const userHasPlayed = !userCanPlayRound(round, userID, declined, forfeited)
        const opponentHasPlayed = !userCanPlayRound(round, opponentID, declined, forfeited)

        return userHasPlayed && !opponentHasPlayed
    }
)

const _getUserTopRoundAndTurn: (state: State, props: GameProps) => RoundAndTurn | undefined = createSelector(
    getSelectedGame,
    getUserID,
    (selectedGame: Game, userID: string) => {
        return topRoundAndTurnForUserInGame(selectedGame, userID)
    }
)

export const getUserTopTurnScore: (state: State, props: GameProps) => number = createSelector(
    _getUserTopRoundAndTurn,
    (roundAndTurn?: RoundAndTurn) => {
       return  roundAndTurn && roundAndTurn.turn && roundAndTurn.turn.score
    }
)

export const getUserTopTurnText: (state: State, props: GameProps) => string[] = createSelector(
    _getUserTopRoundAndTurn,
    (roundAndTurn?: RoundAndTurn) => {
       return  roundAndTurn && roundAndTurn.round && roundAndTurn.turn && splitupTextFromRequiredWords(roundAndTurn.turn.text, roundAndTurn.round.words)
    }
)

export const getTopRoundRequiredWords: (state: State, props: GameProps) => string[] = createSelector(
    _getUserTopRoundAndTurn,
    (roundAndTurn: RoundAndTurn) => {
        return roundAndTurn && roundAndTurn.round && roundAndTurn.round.words
    }
)

export const getGameIsOpen: (state: State, props: GameProps) => boolean = createSelector(
    getSelectedGame,
    getUserID,
    getGameOpponentID,
    (game: Game, userID: string, opponentID: string) => {
        return game && userID && gameIsOpen(game, userID, opponentID)
    }
)

export const getUserWonGame: (state: State, props: GameProps) => boolean = createSelector(
    getSelectedGame,
    getUserID,
    (game?: Game, userID?: string) => {
        if (!game || !userID) {
            return false
        }

        return userWonGame(game, userID)
    }
)

export const getGameUserCanForceForfeitOpponent: (state: State, props: GameProps) => boolean = createSelector(
    getSelectedGame,
    getUserID,
    (game: Game, userID: string) => {
        return userCanForfeitOpponent(game, userID)
    }
)

export const getGameOpponentForfeited: (state: State, props: GameProps) => boolean = createSelector(
    getGameOpponentID,
    getGameForfeitPlayer,
    (opponentId: string, forfeitPlayer: string) => {
        return opponentId === forfeitPlayer
    }
)

export const getGameUserForfeited: (state: State, props: GameProps) => boolean = createSelector(
    getUserID,
    getGameForfeitPlayer,
    (userId: string, forfeitPlayer: string) => {
        return userId === forfeitPlayer
    }
)
