import { PredictScoreValues } from './../types/composeTurn'
import { getUserID } from './../selectors/dataSelectors'
import { getComposeTurnText } from './../selectors/composeTurnSelectors'
import { submitText, setConnectedToInternet, setScore, setSubmitScoreError } from './../actions/composeTurnActions'
import { addGame } from './../actions/dataActions'
import { takeLatest, call, put, select , fork} from 'redux-saga/effects'
import { tokenizeText, assignValuesForTokens, predictFromMappings, calculateScore} from '../utils/scoring/scoringUtils'
import { isConnectedToInternet } from '../utils/networkUtils'
import { postAPI } from './api'
import { getCurrentGameID } from '../selectors/currentGameSelectors'
import { calculateProbOfPOTUS } from '../utils/scoring/linear_scoring/linear_scoring_utils'
export function* submitTextForTurn() {
    const isConnected = yield call(isConnectedToInternet)
    if (isConnected) {
        yield put(setConnectedToInternet(true))
        try {
            const text = yield select(getComposeTurnText)
            const quoteAdjustedText = text.replace('\'', '’')

            const values: PredictScoreValues = yield call(predictScore, quoteAdjustedText)
            yield put(setScore(values.score))
            yield fork(submitTurnToAPI, values, quoteAdjustedText)
        } catch (err) {
            yield put(setSubmitScoreError(err))
        }
    } else {
        yield put(setConnectedToInternet(false))
    }
}

export function* submitTurnToAPI(values: PredictScoreValues, text: string) {
    const currentGameID = yield select(getCurrentGameID)
    const userID = yield select(getUserID)

    const body = {
        user: userID,
        gameId: currentGameID,
        text,
        score: values.score,
        percent: values.percent
    }

    try {
        const result = yield call(postAPI, 'game/submitTurn', body)
        const game = result.response.game
        yield put(addGame(game))
    } catch (err) {
        console.log(err)
    }
}

export function * predictScore(text) {
    const tokenizedText = yield call(tokenizeText, text)
    const textDictionary = yield call(assignValuesForTokens, tokenizedText)
    const prediction = yield call(predictFromMappings, textDictionary)

    const nnPercent = prediction.length > 0 && prediction[0]
    const linPercent = yield call(calculateProbOfPOTUS, text)
    const combinedPercent = (nnPercent * 0.6) + (linPercent * 0.4)
    const score = yield call(calculateScore, combinedPercent)

    return {
        score,
        percent: combinedPercent
    } as PredictScoreValues
}

export function* composeTurnSagas() {
    yield takeLatest(submitText.toString(), submitTextForTurn)
}