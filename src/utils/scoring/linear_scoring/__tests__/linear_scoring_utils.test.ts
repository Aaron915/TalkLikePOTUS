import { vectorizeText, calculateProbOfPOTUS } from '../linear_scoring_utils'

describe('counting the text', () => {
    it('should be able to convert text into an array of counts', () => {
        const text = 'obamacare is a complete joke obamacare'
        const counts = vectorizeText(text)

        const obamacareIndex = 3012
        const completeIndex = 2347
        const jokeIndex = 991

        expect(counts[obamacareIndex]).toEqual(2)
        expect(counts[completeIndex]).toEqual(1)
        expect(counts[jokeIndex]).toEqual(1)

        let otherVocabFilled = false
        counts.forEach((count, idx) => {
            if (otherVocabFilled) {
                return
            }

            if (idx !== obamacareIndex && idx !== completeIndex && idx !== jokeIndex) {
                if (count > 0) {
                    otherVocabFilled = true
                }
            }
        })

        expect(otherVocabFilled).toBeFalsy()
    })
})

describe('predicting if its POTUS', () => {
    it('should correctly predict a score thats likely him', () => {
        const text = 'Obamcare is a complete disaster! American people need better healthcare!'
        expect(calculateProbOfPOTUS(text)).toBeCloseTo(.9699)
    })

    it('should correctly predict a score that is likely not him', () => {
        const text = 'The goal of this is to sound different.'
        expect(calculateProbOfPOTUS(text)).toBeCloseTo(.006)
    })
})