import casual from 'talisman/tokenizers/tweets/casual'
import { NativeModules } from 'react-native'

const { TalkLikePOTUSPredictor } = NativeModules
/**
 * Converts text into a tokenized format
 * that can be passed to ML Algorithms.
 * @export
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeText(text: string): string[] {
    const lowercaseText = text.toLowerCase()
    return casual(lowercaseText)
}

export function assignValuesForTokens(tokens: string[]): number[] {
    const mappingsJSON = require('../../../word_mappings.json')
    const mappings = JSON.parse(mappingsJSON)
    return tokens.map(token => mappings[token] || 7228)
}

export function calculateScore(percent: number): number {
    return Math.round(Math.pow(10, percent) * 100000)
}

export async function predictFromMappings(textMappings: any) {
    return await TalkLikePOTUSPredictor.predict(textMappings)
}
