import { Game } from './../../types/models'
import { RoundInterfaceProps } from './../roundSelectors'
import {
    getComposeTurnText,
    getComposeTurnCharactersRemaining,
    getSplitupText,
    getRequiredWordsIncluded,
    canSubmitTextForTurn,
    getComposeTurnProps,
    getComposeTurnScore
} from './../composeTurnSelectors'
import { State } from './../../types/state'
import { loadJSON } from '../../mockData/loadJSON'

it('should be able to get all of the neccessary properties', () => {
    const text = 'This is a test Regulations of the text Comey selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        },
        featurePrompt: {
            hasSeenTutorialPrompt: true
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getComposeTurnText(state)).toEqual(text)
    expect(getComposeTurnCharactersRemaining(state)).toEqual(87)
    expect(getSplitupText(state, props)).toEqual([
        'This is a test ',
        'Regulations',
        ' of the text ',
        'Comey',
        ' selector'
    ])
    expect(getRequiredWordsIncluded(state, props)).toEqual([true, true])
    expect(canSubmitTextForTurn(state, props)).toEqual(true)
    expect(getComposeTurnProps(state, props)).toEqual({
        requiredWords: ['Regulations', 'Comey'],
        requiredWordsIncluded: [true, true],
        charactersRemaining: 87,
        submitEnabled: true,
        splitupText: [
            'This is a test ',
            'Regulations',
            ' of the text ',
            'Comey',
            ' selector'
        ],
        hasSeenTutorialPrompt: true
    })
})

it('should work if the user starts with a required word', () => {
    const text = 'regulations of'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getSplitupText(state, props)).toEqual([
        'regulations',
        ' of'
    ])
})

it('should not care if the text is lower or upper case', () => {
    const text = 'This is a test regulations of the text comey selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }

    expect(getRequiredWordsIncluded(state, props)).toEqual([true, true])
    expect(getSplitupText(state, props)).toEqual([
        'This is a test ',
        'regulations',
        ' of the text ',
        'comey',
        ' selector'
    ])
})

it('should be able to handle text with no required words included', () => {
    const text = 'This is a test of the text selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getSplitupText(state, props)).toEqual([
        'This is a test of the text selector'
    ])
    expect(getRequiredWordsIncluded(state, props)).toEqual([false, false])
    expect(getRequiredWordsIncluded(state, props).length).toEqual(2)
    expect(canSubmitTextForTurn(state, props)).toEqual(false)
})

it('should only allow for submit if both words are present in the text', () => {
    const text = 'This is a test Regulations of the text selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(canSubmitTextForTurn(state, props)).toEqual(false)
})

it('should past tests on a game that has no text', () => {
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text: ''
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State
    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getRequiredWordsIncluded(state, props)).toEqual([false, false])
})

it('should handle values for no compose text', () => {
    const state = {
        composeTurn: {
        },
        currentGame: {
        },
        data: {
            games: []
        }
    } as State
    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getComposeTurnCharactersRemaining(state)).toEqual(140)
    expect(getSplitupText(state, props)).toEqual([])
    expect(getRequiredWordsIncluded(state, props)).toBeUndefined()
    expect(canSubmitTextForTurn(state, props)).toEqual(false)
})

it('should work correctly if the words are not passed in order', () => {
    const text = 'Comey This is a test Regulations of the text selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State

    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getSplitupText(state, props)).toEqual([
        'Comey',
        ' This is a test ',
        'Regulations',
        ' of the text selector'
    ])
})

it('should have the right properties if only one word is included', () => {
    const text = 'Comey of the text selector'
    const game: Game = loadJSON('game')
    const state = {
        composeTurn: {
            text
        },
        currentGame: {
            gameId: game._id
        },
        data: {
            games: [game]
        }
    } as State
    const props: RoundInterfaceProps = {
        roundNumber: 1
    }
    expect(getRequiredWordsIncluded(state, props)).toEqual([false, true])
})

it('should be able to get the score from compose turn state', () => {
    const score = 345122
    const state = {
        composeTurn: {
            score
        }
    } as State
    expect(getComposeTurnScore(state)).toEqual(score)
})