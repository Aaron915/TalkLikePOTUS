import words from 'talisman/tokenizers/words/naive'

export function vectorizeText(text: string): number[] {
    const lowercasedText = text.toLowerCase()

    const tokenizedWords = words(lowercasedText)
    const vocabulary = require('../../../../linear_model_json/cv_vocab.json')

    const numVocab = Object.keys(vocabulary).length
    const coefArray = Array(numVocab)
    coefArray.fill(0, 0, numVocab - 1)

    tokenizedWords.forEach(word => {
        if (vocabulary[word] != undefined) {
            const index = vocabulary[word]
            const currentValue = coefArray[index]
            const newValue = currentValue + 1
            coefArray[index] = newValue
        }
    })

    return coefArray
}

export function calculateProbOfPOTUS(text: string): number {
    const textCounts = vectorizeText(text)
    const lrModelInfo = require('../../../../linear_model_json/lr_model.json')

    const coefs = lrModelInfo.coefs
    const intercept = lrModelInfo.intercept

    const weights = []
    textCounts.forEach((count, idx) => {
        const coef = coefs[idx]
        weights.push(count * coef)
    })
    const finalWeight = weights.reduce((weight, current) => {
        return weight + current
    }, 0.0)

    const odds = finalWeight + intercept
    const probability = 1 / (1 + Math.pow(Math.E, -(odds)))
    return probability
}