import { ComposeTurnProps } from './../screens/currentGame/CurrentGameDetail/ComposeTurn/ComposeTurn'
import { getRoundRequiredWords, RoundInterfaceProps } from './roundSelectors'
import { maxTurnCharacterLength } from './../constants/appConstants'
import { createSelector, createStructuredSelector } from 'reselect'
import { State } from './../types/state'
import { WordRange } from './../types/misc'
import { rangesForWords, sortRanges, splitUpText } from '../utils/round/roundUtils'
import { getHasSeenTutorialPrompt } from './featurePromptSelectors'

export const getComposeTurnText: (state: State) => string = state => state.composeTurn.text
export const getComposeTurnScore: (state: State) => number | undefined = state => state.composeTurn.score
export const getComposeTurnCharactersRemaining: (state: State) => number = createSelector(
    getComposeTurnText,
    (text?: string) => {
        let textToCount = text || ''
        return maxTurnCharacterLength - textToCount.length
    }
)

const getRangesForRequiredWords: (state: State, props: RoundInterfaceProps) => WordRange[] = createSelector(
    getComposeTurnText,
    getRoundRequiredWords,
    (text: string, words: string[]) => {
        return rangesForWords(text, words)
    }
)

const getSortedRangesForRequiredWords: (state: State, props: RoundInterfaceProps) => WordRange[] = createSelector(
    getRangesForRequiredWords,
    (ranges: WordRange[]) => {
        return sortRanges(ranges)
    }
)

export const getRequiredWordsIncluded: (state: State, props: RoundInterfaceProps) => boolean[] = createSelector(
    getRangesForRequiredWords,
    getRoundRequiredWords,
    (ranges: WordRange[], words: string[]) => {
        if (ranges && ranges.length === 0) {
            return words && words.map(() => false)
        }
        return ranges.map(range => range.start !== -1)
    }
)

export const getSplitupText: (state: State, props: RoundInterfaceProps) => string[] = createSelector(
    getComposeTurnText,
    getSortedRangesForRequiredWords,
    (text?: string, ranges?: WordRange[]) => {
        const splitupText = splitUpText(text, ranges)
        return splitupText
    }
)

export const canSubmitTextForTurn: (state: State, props: RoundInterfaceProps) => boolean = createSelector(
    getRequiredWordsIncluded,
    getComposeTurnCharactersRemaining,
    (requiredWords: boolean[], charactersRemaining: number) => {
        if (!requiredWords) {
            return false
        }
        return requiredWords.filter(word => word === true).length === requiredWords.length && charactersRemaining >= 0
    }
)

export const getComposeTurnProps: (state: State, props: RoundInterfaceProps) => Partial<ComposeTurnProps> = createStructuredSelector({
    requiredWords: getRoundRequiredWords,
    requiredWordsIncluded: getRequiredWordsIncluded,
    charactersRemaining: getComposeTurnCharactersRemaining,
    submitEnabled: canSubmitTextForTurn,
    splitupText: getSplitupText,
    hasSeenTutorialPrompt: getHasSeenTutorialPrompt
})