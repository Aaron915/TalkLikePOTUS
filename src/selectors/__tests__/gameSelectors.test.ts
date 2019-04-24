import { getUserCanPlayRound } from './../roundSelectors'
import {
    GameProps,
    getGameID,
    getSelectedGame,
    getGameOpponentFirstName,
    getGameOpponentRoundWinsCount,
    getGameIsOpen,
    getGameIsAvailable,
    getGameDeclined
} from './../gameSelectors'
import { State } from './../../types/state'
import { loadJSON } from '../../mockData/loadJSON'
import {
    getGameNumberOfRounds,
    getGameOpponent,
    getGameOpponentFullName,
    getGameOpponentProfilePicture,
    getGameOpponentID,
    getGameOpponentNameWithLastNameAbbr,
    getUserRoundWinsCount,
    getGameOpponentCanPlayMostRecentRound,
    getGameUserCanPlayMostRecentRound,
    getUserCanDeclineGame,
    getGameWaitingForOpponent,
    getTopRoundRequiredWords,
    getUserTopTurnScore,
    getUserTopTurnText,
    getUserWonGame,
    getGameUserCanForceForfeitOpponent,
    getGameForfeitPlayer,
    getGameUserForfeited,
    getGameOpponentForfeited
} from '../gameSelectors'
it('should be able to get all the properties for a game thats there', () => {
    const games = loadJSON('games_list_response').response.games
    const idToUse = '5a41c8e023c67aacdb337799'
    const gameToTest = games[0]
    const state = {
        data: {
            games: games,
            user: {
                _id: idToUse
            }
        },
        currentGame: {
        }
    } as State
    const props: GameProps = {
        _id: idToUse
    }
    expect(getGameID(state, props)).toEqual(idToUse)
    expect(getSelectedGame(state, props)).toEqual(gameToTest)
    expect(getGameNumberOfRounds(state, props)).toEqual(1)
    expect(getGameOpponent(state, props)).toEqual(gameToTest.opponent)
    expect(getGameOpponentFirstName(state, props)).toEqual('John')
    expect(getGameOpponentFullName(state, props)).toEqual('John Adeagbostein')
    expect(getGameOpponentProfilePicture(state, props)).toEqual('https://graph.facebook.com/120937442026979/picture?type=large')
    expect(getGameOpponentID(state, props)).toEqual('5a2c7a647ae8fb3758b74783')
    expect(getGameOpponentRoundWinsCount(state, props)).toEqual(0)
    expect(getUserRoundWinsCount(state, props)).toEqual(0)
    expect(getGameOpponentCanPlayMostRecentRound(state, props)).toEqual(true)
    expect(getGameUserCanPlayMostRecentRound(state, props)).toEqual(true)
    expect(getUserCanDeclineGame(state, props)).toEqual(false)
    expect(getGameWaitingForOpponent(state, props)).toEqual(false)
    expect(getTopRoundRequiredWords(state, props)).toBeUndefined()
    expect(getUserTopTurnScore(state, props)).toBeUndefined()
    expect(getUserTopTurnText(state, props)).toBeUndefined()
    expect(getGameIsOpen(state, props)).toEqual(true)
    expect(getUserWonGame(state, props)).toEqual(false)
    expect(getGameIsAvailable(state, props)).toEqual(true)
    expect(getGameUserCanForceForfeitOpponent(state, props)).toEqual(false)
})

it('should be able handle if the game is not there', () => {
    const games = loadJSON('games_list_response').response.games
    const idToUse = 'r'
    const gameToTest = games[0]
    const state = {
        data: {
            games: games
        },
        currentGame: {}
    } as State
    const props: GameProps = {
        _id: idToUse
    }
    expect(getGameID(state, props)).toEqual(idToUse)
    expect(getSelectedGame(state, props)).toBeUndefined()
    expect(getGameNumberOfRounds(state, props)).toBeUndefined()
    expect(getGameOpponent(state, props)).toBeUndefined()
    expect(getGameOpponentFullName(state, props)).toBeUndefined()
    expect(getGameOpponentProfilePicture(state, props)).toBeUndefined()
    expect(getGameOpponentID(state, props)).toBeUndefined()
})

it('should be able to handle if the props are not there', () => {
    expect(getGameID(undefined)).toBeUndefined()
})

it('should return false for game is available if its not there', () => {
    const state = {
        data: {
            games: []
        },
        currentGame: {
            gameId: 'werwer'
        }
    } as State
    expect(getGameIsAvailable(state, {})).toEqual(false)
})

it('should handle props correctly if the game was declined', () => {
    const game = loadJSON('declined_game')
    const user = loadJSON('user_2')
    const state = {
        data: {
            games: [game],
            user
        }
    } as State

    const props: GameProps = {
        _id: '5a7d085859a7ff001afb67d1'
    }
    expect(getGameDeclined(state, props)).toEqual(true)
    expect(getGameUserCanPlayMostRecentRound(state, props)).toEqual(false)
    expect(getGameOpponentCanPlayMostRecentRound(state, props)).toEqual(false)
})

describe('handling forfeited games', () => {
    it('should have all of the correct properties when a user forfeits', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.forfeitPlayer = '5a7908134f07ff001ac60e7d'
        const state = {
            data: {
                games: [game],
                user: {
                    _id: '5a7908134f07ff001ac60e7d'
                }
            }
        } as State
        const props: GameProps = {
            _id: '5a808a0ee5e3c20014cb5019'
        }
        expect(getGameForfeitPlayer(state, props)).toEqual('5a7908134f07ff001ac60e7d')
        expect(getGameUserForfeited(state, props)).toEqual(true)
    })

    it('Should have all of the right properties when the opponent forfeits', () => {
        const game = loadJSON('waiting_for_opponent_game')
        game.forfeitPlayer = '5a792183b1eafb001a39810a'
        const state = {
            data: {
                games: [game],
                user: {
                    _id: '5a7908134f07ff001ac60e7d'
                }
            }
        } as State
        const props: GameProps = {
            _id: '5a808a0ee5e3c20014cb5019'
        }
        expect(getGameForfeitPlayer(state, props)).toEqual('5a792183b1eafb001a39810a')
        expect(getGameOpponentForfeited(state, props)).toEqual(true)
    })

    it('Should have the right properties if there isnt a forfeit', () => {
        const game = loadJSON('waiting_for_opponent_game')
        const state = {
            data: {
                games: [game],
                user: {
                    _id: '5a7908134f07ff001ac60e7d'
                }
            }
        } as State
        const props: GameProps = {
            _id: '5a808a0ee5e3c20014cb5019'
        }
        expect(getGameForfeitPlayer(state, props)).toBeUndefined()
        expect(getGameOpponentForfeited(state, props)).toEqual(false)
        expect(getGameUserForfeited(state, props)).toEqual(false)
    })
})