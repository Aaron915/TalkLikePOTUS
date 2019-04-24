import { gameOverviewStyles } from './../../../screens/currentGame/CurrentGameDetail/RoundDetail/components/GameOverView/GameOverviewStyles'
import { loadJSON } from '../../../mockData/loadJSON'
import { gameLatestRound, userCanForfeitOpponent, gameOpponent, gameIsOpen, nameAbbreviated, topRoundAndTurnForUserInGame, userRoundsWon, userWonGame, gameDeclined } from '../gameUtils'
it('should be able to get the latest round', () => {
    // TODO: Make this a multi round game.
    const game = loadJSON('game')
    const round = gameLatestRound(game)
    expect(round._id).toBeDefined()
    expect(round.turns).toBeDefined()
})

it('should return the opponent', () => {
    const game = loadJSON('game')
    expect(gameOpponent(game)).toEqual(game.opponent)
})

it('should return undefined if no game for all functions', () => {
    const round = gameLatestRound(undefined)
    const opponent = gameOpponent(undefined)
    expect(round).toBeUndefined()
    expect(opponent).toBeUndefined()
})

describe('determining if game is complete', () => {
    it('should return true if the game does not have enough rounds', () => {
        const game = loadJSON('game')
        expect(gameIsOpen(game, 'fdsfd', 'fdsasdf')).toBeTruthy()
    })

    it('should return false if the game is complete', () => {
        const game = loadJSON('complete_game')
        expect(gameIsOpen(game, '5a7a65c03a9a35001a4677bc', '5a5d515796c17c0014e558e8')).toEqual(false)
    })

    it('should return false if the game was declined', () => {
        const declinedGame = loadJSON('declined_game')
        expect(gameIsOpen(declinedGame, '5a7d085859a7ff001afb67d0', '5a7908134f07ff001ac60e7d')).toEqual(false)
    })

    it('should return false if a player forfeited', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.forfeitPlayer = '5a792183b1eafb001a39810a'
        expect(gameIsOpen(game, '5a7908134f07ff001ac60e7d', '5a792183b1eafb001a39810a')).toEqual(false)
    })
})

describe('determining if a game was declined', () => {
    it('should return true if it was declined', () => {
        const declinedGame = loadJSON('declined_game')
        expect(gameDeclined(declinedGame)).toBe(true)
    })

    it('should return false if it was not declined', () => {
        const game = loadJSON('complete_game')
        expect(gameDeclined(game)).toBe(false)
    })
})

describe('abbreviating the users name', () => {
    it('should return an empty string if first name or last name is not there', () => {
        const firstName = 'Leonardo'
        const lastName = 'Da Vinci'
        expect(nameAbbreviated(undefined, lastName)).toBeUndefined()
        expect(nameAbbreviated(firstName, undefined)).toBeUndefined()
    })

    it('should abbreviate a name correctly', () => {
        const firstName = 'Leonardo'
        const lastName = 'Da Vinci'
        expect(nameAbbreviated(firstName, lastName)).toEqual('Leonardo D.')
    })
})

describe('getting the top turn', () => {
    it('should get the top turn', () => {
        const game = loadJSON('submitTurnResponse').response.game
        const topRoundAndTurn = topRoundAndTurnForUserInGame(game, '5a2c798e7ae8fb3758b74782')
        expect(topRoundAndTurn.turn.text).toEqual('Testing fox fraudulent Testing Testing')
        expect(topRoundAndTurn.turn.score).toEqual(250500)

    })

    it('should return undefined if a turn is not available', () => {
        const game = loadJSON('submitTurnResponse').response.game
        const topRoundAndTurn = topRoundAndTurnForUserInGame(game, 'fakeID')
        expect(topRoundAndTurn).toBeUndefined()
    })

    it('should return undefined if the data is not complete', () => {
        const game = undefined
        const topRoundAndTurn = topRoundAndTurnForUserInGame(game, '5a2c798e7ae8fb3758b74782')
        expect(topRoundAndTurn).toBeUndefined()
    })
})

describe('getting the users rounds that were won', () => {
    it('should return the correct number of wins for the full game', () => {
        const game = loadJSON('game_with_rounds')
        const roundsWonFirstUser = userRoundsWon(game, '5a2c798e7ae8fb3758b74782')
        const roundsWonSecondUser = userRoundsWon(game, '5a2c7a647ae8fb3758b74783')
        expect(roundsWonFirstUser).toEqual(1)
        expect(roundsWonSecondUser).toEqual(2)
    })

    it('should return the correct number of wins when the round is shorter', () => {
        const game = loadJSON('game_with_rounds')
        const upToRound = 2
        const roundsWonFirstUser = userRoundsWon(game, '5a2c798e7ae8fb3758b74782', upToRound)
        const roundsWonSecondUser = userRoundsWon(game, '5a2c7a647ae8fb3758b74783', upToRound)
        expect(roundsWonFirstUser).toEqual(1)
        expect(roundsWonSecondUser).toEqual(1)
    })

    it('should return the full full game if it attempted to get an out of bounds round', () => {
        const game = loadJSON('game_with_rounds')
        const upToRound = 4
        const roundsWonFirstUser = userRoundsWon(game, '5a2c798e7ae8fb3758b74782', upToRound)
        const roundsWonSecondUser = userRoundsWon(game, '5a2c7a647ae8fb3758b74783', upToRound)
        expect(roundsWonFirstUser).toEqual(1)
        expect(roundsWonSecondUser).toEqual(2)
    })
})

describe('determing if a user won the game', () => {
    it('should correctly identify if a user won the game', () => {
        let game = loadJSON('game_with_rounds_complete')
        expect(userWonGame(game, '5a2c798e7ae8fb3758b74782')).toEqual(false)
        expect(userWonGame(game, '5a2c7a647ae8fb3758b74783')).toEqual(true)
    })

    it('should determine the user won if the opponent forfeited', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.forfeitPlayer = '5a792183b1eafb001a39810a'
        expect(userWonGame(game, '5a7908134f07ff001ac60e7d')).toEqual(true)
    })
})

describe('determining if the user can forfeit the opponent', () => {
    it('should allow the user to forfeit the opponent if they havent played 4 days after this user', () => {
        const game = loadJSON('waiting_for_opponent_game')
        const referenceDate = new Date('2018-02-16T20:57:31.540Z')
        const canForfeitOpponent = userCanForfeitOpponent(game, '5a7908134f07ff001ac60e7d', referenceDate)
        expect(canForfeitOpponent).toEqual(true)
    })

    it('should not allow the user to forfeit the opponent if the opponent has played', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.rounds[1].turns = [
            {
                updatedAt: '2018-02-11T20:57:31.540Z',
                createdAt: '2018-02-11T20:57:31.540Z',
                _id: '5a80a02bd84801001472a757',
                percent: 0.23819070865201,
                score: 173058,
                text: 'Billions of dollars and North Korea',
                user: '5a792183b1eafb001a39810a'
            }
        ]
        const referenceDate = new Date('2018-02-16T20:57:31.540Z')
        const canForfeitOpponent = userCanForfeitOpponent(game, '5a7908134f07ff001ac60e7d', referenceDate)
       expect(canForfeitOpponent).toEqual(false)
    })

    it('should not let the user forfeit the opponent if has been less than 4 days since the user played', () => {
        const game = loadJSON('waiting_for_opponent_game')
        const referenceDate = new Date('2018-02-13T20:57:31.540Z')
        const canForfeitOpponent = userCanForfeitOpponent(game, '5a7908134f07ff001ac60e7d', referenceDate)
        expect(canForfeitOpponent).toEqual(false)
    })

    it('should not let the user forfeit the opponent if the user hasnt played', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.rounds[1].turns = []
        const referenceDate = new Date('2018-02-16T20:57:31.540Z')
        const canForfeitOpponent = userCanForfeitOpponent(game, '5a7908134f07ff001ac60e7d', referenceDate)
        expect(canForfeitOpponent).toEqual(false)
    })
})
