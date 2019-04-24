import { numRoundsToWin, daysTillCanForceForfeit } from './../../constants/appConstants'
import { Round, Game, Opponent, Turn } from './../../types/models'
import { turnForUserID, userWonRound } from '../round/roundUtils'
import { datesAreAboveDaysApart } from '../dateUtils'

export function gameLatestRound(game?: Game): Round | undefined {
    if (!game) {
        return undefined
    }
    const lastIndex = game.rounds.length - 1
    return game.rounds[lastIndex]
}

export function gameOpponent(game: Game): Opponent | undefined {
    return game && game.opponent
}

export function gameDeclined(game: Game): boolean {
    if (!game || !game.declined) {
        return false
    }
    return game && game.declined
}

export function gameIsOpen(game: Game, userID: string, opponentID: string): boolean {
    if (!game || !userID || !opponentID) {
        return true
    }

    const forfeited = game.forfeitPlayer !== null && game.forfeitPlayer !== undefined
    const declined = gameDeclined(game)
    const userWon = userWonGame(game, userID)
    const opponentWon = userWonGame(game, opponentID)

    return !userWon && !opponentWon && !declined && !forfeited
}

export function nameAbbreviated(firstName?: string, lastName?: string): string | undefined {
    if (!firstName || !lastName) {
        return undefined
    }

    return `${firstName} ${lastName.slice(0, 1)}.`
}

export interface RoundAndTurn {
    turn: Turn,
    round: Round
}

export function topRoundAndTurnForUserInGame(game: Game, userID: string): RoundAndTurn | undefined {
    if (!game || !game.rounds || !userID) {
        return undefined
    }

    let selectedTurn: Turn
    let selectedRound: Round
    game.rounds.forEach((round: Round) => {
        const userTurn = turnForUserID(round, userID)
        if (!userTurn) {
            return
        }
        if (!selectedTurn || selectedTurn.score < userTurn.score) {
            selectedTurn = userTurn
            selectedRound = round
        }
    })

    return selectedTurn && selectedRound && {
        turn: selectedTurn,
        round: selectedRound
    }
}

// UpToRound will calculate the score up to that round if possible.
export function userRoundsWon(game: Game, userID: string, upToRound?: number) {
    let rounds = game.rounds
    if (upToRound && game.rounds.length - 1 >= upToRound) {
        rounds = rounds.slice(0, upToRound)
    }

    return rounds.filter((round) => userWonRound(round, userID)).length
}

export function userWonGame(game: Game, userID: string) {
    if (!game || !userID) {
        return false
    }
    const numWins = userRoundsWon(game, userID)
    return numWins === numRoundsToWin || game.forfeitPlayer === game.opponent._id
}

export function userCanForfeitOpponent(game: Game, userId: string, referenceDate: Date = new Date()): boolean {
    const latestRound = gameLatestRound(game)
    if (!latestRound) {
        return false
    }

    const userTurn = turnForUserID(latestRound, userId)
    if (!userTurn || !userTurn.updatedAt) {
        return false
    }

    const opponentTurn = turnForUserID(latestRound, game.opponent._id)
    if (opponentTurn) {
        return false
    }

    const turnDate = new Date(userTurn.updatedAt)

    return datesAreAboveDaysApart(turnDate, referenceDate, daysTillCanForceForfeit)
}
