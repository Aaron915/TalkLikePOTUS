import { getUserProfilePicture } from './../dataSelectors'
import { ScoreDetailProps } from './../../screens/currentGame/CurrentGameDetail/ScoreDetail/ScoreDetail'
import { RoundInterfaceProps, getOpponentScoreForRound } from './../roundSelectors'
import { maxScore } from './../../constants/appConstants'
import { getComposeTurnScore } from './../composeTurnSelectors'
import { createSelector, createStructuredSelector } from 'reselect'
import { State } from './../../types/state'
import { getGameOpponentProfilePicture } from '../gameSelectors'
import Numeral from 'numeral'

function getScorePercent(score?: number) {
    if (!score) {
        return undefined
    }
    if (score >= maxScore) {
        return 1
    } else {
        return score / maxScore
    }
}

export const getUserScorePercent: (state: State) => number = createSelector(
    getComposeTurnScore,
    (score?: number) => {
        return getScorePercent(score)
    }
)

export const getUserScoreFormatted: (state: State) => string | undefined = createSelector(
    getComposeTurnScore,
    (score?: number) => {
        return score && Numeral(score).format('0,0')
    }
)

// TODO: test this.
export const getOpponentScorePercent: (state: State, props: RoundInterfaceProps) => number = createSelector(
    getOpponentScoreForRound,
    (score?: number) => {
        return getScorePercent(score)
    }
)

export const getUserWon: (state: State, props: RoundInterfaceProps) => boolean | undefined = createSelector(
    getOpponentScoreForRound,
    getComposeTurnScore,
    (opponentScore?: number, composeTurnScore?: number) => {
        return opponentScore && composeTurnScore && composeTurnScore > opponentScore
    }
)

export const getScoreDetailsProps: (state: State, props: RoundInterfaceProps) => Partial<ScoreDetailProps> | undefined = createStructuredSelector({
    userScorePercent: getUserScorePercent,
    opponentScorePercent: getOpponentScorePercent,
    opponentProfilePicture: getGameOpponentProfilePicture,
    userWon: getUserWon,
    userScoreFormatted: getUserScoreFormatted,
    userProfilePicture: getUserProfilePicture
})