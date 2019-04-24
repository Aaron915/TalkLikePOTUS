import { tokenizeText, assignValuesForTokens, calculateScore } from '../scoringUtils'

describe('Tokenizing', () => {
    it('should be able to properly tokenize tweets', () => {
        const tweet1 = 'Testing @realdonaldTrump with !!!'
        const tokenizedTweet = ['testing', '@realdonaldtrump', 'with', '!', '!', '!']
        expect(tokenizeText(tweet1)).toEqual(tokenizedTweet)
    })
})

describe('word counts', () => {
    it('should properly assign values', () => {
        const tokenized = ['Testing', 'word', 'with', '!', '!', '!']
        const values = assignValuesForTokens(tokenized)
        expect(values.length).toBe(6)
        // These will likely need to be updated.
        expect(values[0]).toBe(7228)
        expect(values[1]).toBe(5916)
        expect(values[2]).toBe(182)
        expect(values[3]).toBe(4689)
        expect(values[4]).toBe(4689)
        expect(values[5]).toBe(4689)
    })
})

describe('scoring', () => {
    it('should return the correct score based on predicted probability', () => {
        const score = 0.99
        expect(calculateScore(score)).toBeCloseTo(977237)
    })
})
