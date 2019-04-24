import { getUserTurnForRound } from './../../../selectors/roundSelectors'
import { WordRange } from './../../../types/misc'
import { rangesForWords, sortRanges, splitUpText, splitupTextFromRequiredWords, userSubmittedTurnForRound, turnForUserID, userWonRound, userCanPlayRound } from '../roundUtils'
import { loadJSON } from '../../../mockData/loadJSON'

describe('retrieving word ranges', () => {
    it('should be able to get ranges if one of the words included', () => {
        const text = 'this is at test'
        const words = ['potato', 'test']
        const firstRange = rangesForWords(text, words)[0]
        expect(firstRange.start).toEqual(-1)
    })

    it('should be able to get ranges if there are words included', () => {
        const text = 'this is at test'
        const words = ['test']

        const firstRange = rangesForWords(text, words)[0]
        expect(firstRange.start).toEqual(11)
        expect(firstRange.end).toEqual(15)
    })

    it('should return empty array with no text', () => {
        const text = undefined
        const words = ['test']

        const length = rangesForWords(text, words).length
        expect(length).toEqual(0)
    })

    it('should return empty array with no words', () => {
        const text = 'test'
        const words = undefined

        const length = rangesForWords(text, words).length
        expect(length).toEqual(0)
    })

    it('should convert dumb quotes to smart quotes', () => {
        const text = 'This couldn\'t work'
        const words = ['couldn’t']
        expect(rangesForWords(text, words).length).toEqual(1)
    })

    it('should keep smart quotes the same', () => {
        const text = 'This couldn’t work'
        const words = ['couldn’t']
        expect(rangesForWords(text, words).length).toEqual(1)
    })
})

describe('sorting the ranges', () => {
    it('should correctly sort a range of words', () => {
        const range1: WordRange = {
            start: 1,
            end: 3
        }
        const range2: WordRange = {
            start: 5,
            end: 6
        }
        expect(sortRanges([range2, range1])[0]).toBe(range1)
    })
})

describe('splitting up a string by ranges', () => {
    it('should be able to split up a string with more than 1 range', () => {
        const ranges: WordRange[] = [
            {
                start: 0,
                end: 3
            },
            {
                start: 8,
                end: 10
            }
        ]
        const text = 'this is a test to see how this goes'
        expect(splitUpText(text, ranges)).toEqual(['thi', 's is ', 'a ', 'test to see how this goes'])
    })

    it('should return the regular text if there is no valid range', () => {
        let range: WordRange = {
            start: -1
        }
        const text = 'this is a test'
        expect(splitUpText(text, [range])).toEqual([text])
    })

    it('should return an empty array if there is no text', () => {
        expect(splitUpText(undefined, [])).toEqual([])
    })
})

describe('splitting up text from required words', () => {
    it('should handle both words being present', () => {
        const requiredWords = ['Loser', 'this test']
        const text = 'this test lets see if it works loser'
        expect(splitupTextFromRequiredWords(text, requiredWords)).toEqual(['this test', ' lets see if it works ', 'loser'])
    })

    it('should handle text words required words being undefined', () => {
        const requiredWords = ['Loser', 'this test']
        const text = undefined
        expect(splitupTextFromRequiredWords(text, requiredWords)).toBeUndefined()

        const secondRequiredWords = undefined
        const secondtext = 'this test lets see if it works loser'
        expect(splitupTextFromRequiredWords(secondtext, secondRequiredWords)).toEqual(['this test lets see if it works loser'])
    })

    it('should handle no words included', () => {
        const secondRequiredWords = ['skywalker', 'et tu Brute?']
        const secondtext = 'this test lets see if it works loser'
        expect(splitupTextFromRequiredWords(secondtext, secondRequiredWords)).toEqual(['this test lets see if it works loser'])
    })
})

describe('determining if the user played', () => {
    it('should return true if the user played in this round', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userSubmittedTurnForRound(round, '5a2c798e7ae8fb3758b74782')).toBeTruthy()
    })

    it('should return false if the user hasnt played this round', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userSubmittedTurnForRound(round, '23')).toBeFalsy()
    })
})

describe('getting the turn from the user ID', () => {
    it('should return undefined if a turn could not be found', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(turnForUserID(round, '2343')).toBeUndefined()
    })

    it('should return the turn if its available', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(turnForUserID(round, '5a2c798e7ae8fb3758b74782')).toEqual(round.turns[0])
    })
})

describe('determing if the user has won a round', () => {
    it('should return true if the user won the round', () => {
        // TODO: implement this test
    })

    it('should return false if there are not enough turns', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userWonRound(round, '5a2c798e7ae8fb3758b74782')).toEqual(false)
    })

    it('should return false if the user lost', () => {
        // TODO: implement this test
    })
})

describe('determining if a user can play a round', () => {
    it('should return true if the user can play the round', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userCanPlayRound(round, 'afadsf', false, false)).toEqual(true)
    })

    it('should return false if a user forfeited', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userCanPlayRound(round, 'afadsf', false, true)).toEqual(false)
    })

    it('should return false if the user cannot play the round', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userCanPlayRound(round, '5a2c798e7ae8fb3758b74782', false, false)).toEqual(false)
    })

    it('should return false if the game is declined', () => {
        const round = loadJSON('submitTurnResponse').response.game.rounds[0]
        expect(userCanPlayRound(round, 'afadsf', true, false)).toEqual(false)
    })
})
