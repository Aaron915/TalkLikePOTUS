import {
    RoundInterfaceProps,
    getRound,
    getRoundRequiredWords,
    getRoundNumber,
    getUserTurnForRound,
    getUserTextForRound,
    getUserCanPlayRound,
    getOpponentTurnForRound,
    getOpponentScoreForRound,
    getOpponentTextForRound,
    getHideOpponentText,
    getWaitingForOpponent,
    getUserWonRound,
    getOpponentWonRound,
    getOpponentSplitupText,
    getUserSplitupText,
    getOpponentWinsUpToRound,
    getUserWinsUpToRound
} from './../roundSelectors'
import { State } from './../../types/state'
import { Game } from './../../types/models'
import { loadJSON } from '../../mockData/loadJSON'
it('should be able to read all properties from an empty round on the current game', () => {
    const game = loadJSON('game') as Game
    const state = {
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game],
            user: loadJSON('user_2')
        }
    } as State

    const props = {
        roundNumber: 1
    } as RoundInterfaceProps
    expect(getRoundNumber(state, props)).toEqual(1)
    expect(getRound(state, props)).toBeTruthy()
    expect(getRoundRequiredWords(state, props)).toEqual([
        'Regulations',
        'Comey'
    ])

    // TODO: update when these tests need a round
    expect(getUserTurnForRound(state, props)).toBeUndefined()
    expect(getUserTextForRound(state, props)).toBeUndefined()
    expect(getUserCanPlayRound(state, props)).toBeTruthy()
    expect(getOpponentTurnForRound(state, props)).toBeUndefined()
    expect(getOpponentScoreForRound(state, props)).toBeUndefined()
    expect(getOpponentTextForRound(state, props)).toBeUndefined()
    expect(getHideOpponentText(state, props)).toBeTruthy()
    expect(getWaitingForOpponent(state, props)).toBeUndefined()
    expect(getUserWonRound(state, props)).toBeUndefined()
    expect(getOpponentWinsUpToRound(state, props)).toEqual(0)
    expect(getUserWinsUpToRound(state, props)).toEqual(0)
})

it('should be able to read all of the props if the game came from the props', () => {
    const game = loadJSON('submitTurnResponse').response.game as Game
    const state = {
        data: {
            games: [game],
            user: loadJSON('user_2')
        }, currentGame: {}
    } as State

    const props = {
        roundNumber: 1,
    _id: game._id
    } as RoundInterfaceProps
    expect(getRoundNumber(state, props)).toEqual(1)
    expect(getRound(state, props)).toBeTruthy()
    expect(getRoundRequiredWords(state, props)).toEqual([
        'Fraudulent',
        'fox'
    ])

    // TODO: update when these tests need a round
    expect(getUserTurnForRound(state, props)).toEqual(game.rounds[0].turns[0])
    expect(getUserTextForRound(state, props)).toEqual(game.rounds[0].turns[0].text)
    expect(getUserCanPlayRound(state, props)).toBeFalsy()
    expect(getUserSplitupText(state, props)).toEqual(['Testing ', 'fox', ' ', 'fraudulent', ' Testing Testing'])
    expect(getOpponentTurnForRound(state, props)).toBeUndefined()
    expect(getOpponentScoreForRound(state, props)).toBeUndefined()
    expect(getOpponentTextForRound(state, props)).toBeUndefined()
    expect(getHideOpponentText(state, props)).toBeTruthy()
    expect(getWaitingForOpponent(state, props)).toEqual('Waiting for John...')
    expect(getUserWonRound(state, props)).toBeUndefined()
    expect(getOpponentWinsUpToRound(state, props)).toEqual(0)
    expect(getUserWinsUpToRound(state, props)).toEqual(0)
})

it('should be able to read all the properties when the opponent has entered their turn', () => {
    const game = loadJSON('game_with_opponent_turn') as Game
    const state = {
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game],
            user: loadJSON('user_2')
        }
    } as State

    const props = {
        roundNumber: 1
    } as RoundInterfaceProps
    expect(getOpponentTurnForRound(state, props)).toBeDefined()
    expect(getOpponentScoreForRound(state, props)).toEqual(456000)
    expect(getOpponentTextForRound(state, props)).toEqual('Comey is just a puppet for the dems, who want regulations. Sad!')
    expect(getOpponentSplitupText(state, props)).toEqual(['Comey', ' is just a puppet for the dems, who want ', 'regulations', '. Sad!'])
    expect(getOpponentWonRound(state, props)).toBeUndefined()
    expect(getOpponentWinsUpToRound(state, props)).toEqual(0)
    expect(getUserWinsUpToRound(state, props)).toEqual(0)
})