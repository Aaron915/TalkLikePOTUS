import { numusersInGame } from './../../constants/appConstants'
import { Round, Turn } from './../../types/models'
import { WordRange } from './../../types/misc'

export function rangesForWords(text?: string, words?: string[]) {
    if (!text || !words) {
        return []
    }

    const textWithSmartQuotes = text.replace('\'', '’')
    const lowercaseText = textWithSmartQuotes.toLowerCase()
    const lowercaseRequiredWords = words.map(word => word.toLowerCase())

    const ranges: WordRange[] = lowercaseRequiredWords.map(word => {
        let wordRange: WordRange = {}
        const startIndex = lowercaseText.indexOf(word)
        wordRange.start = startIndex
        if (wordRange.start !== -1) {
            wordRange.end = startIndex + word.length
        }
        return wordRange
    })

    return ranges
}

export function sortRanges(ranges: WordRange[]) {
    return ranges.sort((range1, range2) => range1.start - range2.start)
}

export function splitUpText(text?: string, ranges?: WordRange[]): string[] {
    let hasValidRanges = ranges.find(range => range.start !== -1) !== undefined
    if (!text || !ranges) {
        return []
    }
    if (!hasValidRanges) {
        return [text]
    }

    let mostRecentRange = 0
    let splitupText = []
    const includedRanges = ranges.filter(range => range.start !== -1)
    includedRanges.forEach((range: WordRange, idx: number) => {

        if (range.start !== 0) {
            let beginningString = text.slice(mostRecentRange, range.start)
            splitupText.push(beginningString)
        }

        splitupText.push(text.slice(range.start, range.end))
        mostRecentRange = range.end

        // Add range for whatever is left.
        if (idx === includedRanges.length - 1 && mostRecentRange !== text.length) {
            splitupText.push(text.slice(mostRecentRange, text.length))
        }
    })
    return splitupText
}

export function splitupTextFromRequiredWords(text?: string, words?: string[]): string[] | undefined {
    if (!text) {
        return undefined
    }
    const ranges = rangesForWords(text, words)
    const sortedRanges = sortRanges(ranges)
    return splitUpText(text, sortedRanges)
}

export function userSubmittedTurnForRound(round: Round, userID: string) {
    return round.turns && round.turns.filter((turn: Turn) => turn.user === userID).length !== 0
}

// Test
export function turnForUserID(round: Round, userID: string): Turn | undefined {
    return round.turns.filter((turn: Turn) => turn.user === userID)[0]
}

export function userWonRound(round: Round, userID: string): boolean {
   if (round.turns.length !== numusersInGame) {
        return false
   }
   const sortedTurns = round.turns.sort((firstTurn: Turn, secondTurn: Turn) => secondTurn.score - firstTurn.score)

   return sortedTurns[0].user === userID
}

export function userCanPlayRound(round: Round, userID: string, gameDeclined: boolean, gameForfeited: boolean): boolean {
    return turnForUserID(round, userID) === undefined && !gameDeclined && !gameForfeited
}
