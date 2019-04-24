import { Game } from './../../../types/models'
import { RoundInterfaceProps } from './../../roundSelectors'
import {
    getUserScorePercent,
    getUserScoreFormatted,
    getOpponentScorePercent,
    getUserWon,
    getScoreDetailsProps
} from './../scoreDetailSelectors'
import { State } from './../../../types/state'
import { loadJSON } from '../../../mockData/loadJSON'

it('should have the correct values once a user has submitted their score', () => {
    const state = {
        composeTurn: {
            score: 350000
        }
    } as State
    expect(getUserScorePercent(state)).toEqual(0.35)
    expect(getUserScoreFormatted(state)).toEqual('350,000')
})

it('should have the correct values if the opponent has entered their score', () => {
    const game = loadJSON('game_with_opponent_turn') as Game
    const state = {
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game],
            user: loadJSON('user_2')
        },
        composeTurn: {
            score: 350000
        }
    } as State

    const props = {
        roundNumber: 1
    } as RoundInterfaceProps
    expect(getOpponentScorePercent(state, props)).toEqual(0.456)
    expect(getUserWon(state, props)).toEqual(false)
})

it('should have the correct values if no one has submitted their score', () => {
    const state = {
        composeTurn: {}
    } as State
    expect(getUserScorePercent(state)).toBeUndefined()
    expect(getUserScoreFormatted(state)).toBeUndefined()
})

it('should return the correct props', () => {
    const game = loadJSON('game_with_opponent_turn') as Game
    const state = {
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game],
            user: loadJSON('user_2')
        },
        composeTurn: {
            score: 350000
        }
    } as State

    const props = {
        roundNumber: 1
    } as RoundInterfaceProps
    expect(getScoreDetailsProps(state, props)).toEqual({
        userScorePercent: 0.35,
        opponentScorePercent: 0.456,
        opponentProfilePicture: 'https://graph.facebook.com/120937442026979/picture?type=large',
        userWon: false,
        userScoreFormatted: '350,000',
        userProfilePicture: 'https://graph.facebook.com/100985950686286/picture?type=large'
    })
})

it('should return 1 if the score is above the max', () => {
    const state = {
        composeTurn: {
            score: 1400000
        }
    } as State
    expect(getUserScorePercent(state)).toEqual(1)
    expect(getUserScoreFormatted(state)).toEqual('1,400,000')
})