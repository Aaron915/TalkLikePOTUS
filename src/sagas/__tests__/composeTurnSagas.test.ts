import { addGame } from './../../actions/dataActions'
import { getCurrentGameID } from './../../selectors/currentGameSelectors'
import { getComposeTurnText } from './../../selectors/composeTurnSelectors'
import { submitText, setConnectedToInternet, setScore, setSubmitScoreError } from './../../actions/composeTurnActions'
import { takeLatest, call, select, put, fork } from 'redux-saga/effects'
import { composeTurnSagas, submitTextForTurn, predictScore, submitTurnToAPI } from '../composeTurnSagas'
import { tokenizeText, assignValuesForTokens, predictFromMappings, calculateScore } from '../../utils/scoring/scoringUtils'
import { NativeModules } from 'react-native'
import { isConnectedToInternet } from '../../utils/networkUtils'
import { getUserID } from '../../selectors/dataSelectors'
import { postAPI } from '../api'
import { loadStartData } from '../../actions/dataActions'
import { loadJSON } from '../../mockData/loadJSON'
import { getGameID } from '../../selectors/gameSelectors'
import { calculateProbOfPOTUS } from '../../utils/scoring/linear_scoring/linear_scoring_utils'

const { TalkLikePOTUSPredictor } = NativeModules

it('should listen for all the correct actions', () => {
    let saga = composeTurnSagas()
    expect(saga.next().value).toEqual(takeLatest(submitText.toString(), submitTextForTurn))
})

it('should be able to predict a score', () => {
    let text = 'This is a test'
    let saga = predictScore(text)
    expect(saga.next().value).toEqual(call(tokenizeText, text))
    const tokenizedText = ['This', 'is', 'a', 'test']
    expect(saga.next(tokenizedText).value).toEqual(call(assignValuesForTokens, tokenizedText))
    const dictionaryText = [12, 3, 1234, 9795]
    expect(saga.next(dictionaryText).value).toEqual(call(predictFromMappings, dictionaryText))
    const percent = [0.60]
    const linPercent = [0.4]
    expect(saga.next(percent).value).toEqual(call(calculateProbOfPOTUS, text))
    expect(saga.next(linPercent).value).toEqual(call(calculateScore, 0.52))
    const score = 500000
    expect(saga.next(score).value).toEqual({score, percent: 0.52})
})

it('should handle a valid text submission correctly', () => {
    const text = 'test submission'
    let saga = submitTextForTurn()
    expect(saga.next().value).toEqual(call(isConnectedToInternet))
    expect(saga.next(true).value).toEqual(put(setConnectedToInternet(true)))
    expect(saga.next().value).toEqual(select(getComposeTurnText))
    expect(saga.next(text).value).toEqual(call(predictScore, text))
    const score = 234222
    const percent = 0.75
    const values = {
        score,
        percent
    }
    expect(saga.next(values).value).toEqual(put(setScore(score)))
    expect(saga.next().value).toEqual(fork(submitTurnToAPI, values, text))
})

it('should handle submitting the score correctly', () => {
    const text = 'this is a test'
    const score = 345555
    const percent = 0.75
    const values = {
        score,
        percent
    }
    const gameID = 'fsf3'
    const userID = 'fjklasd;f'
    const submitTurnResponse = loadJSON('submitTurnResponse')

    let saga = submitTurnToAPI(values, text)
    expect(saga.next().value).toEqual(select(getCurrentGameID))
    expect(saga.next(gameID).value).toEqual(select(getUserID))
    const body = {
        user: userID,
        gameId: gameID,
        text,
        score,
        percent
    }
    expect(saga.next(userID).value).toEqual(call(postAPI, 'game/submitTurn', body))
    expect(saga.next(submitTurnResponse).value).toEqual(put(addGame(submitTurnResponse.response.game)))
})

it('should handle no internet connection when submitting a turn', () => {
    let saga = submitTextForTurn()
    saga.next()
    expect(saga.next(false).value).toEqual(put(setConnectedToInternet(false)))
})

it('should handle an error occurring', () => {
    let saga = submitTextForTurn()
    saga.next()
    saga.next(true)
    saga.next()
    const error = {
        er: 'test'
    }
    expect(saga.throw(error).value).toEqual(put(setSubmitScoreError(error)))
})

it('should transform regular quotes before sending them', () => {
    let saga = submitTextForTurn()
    const text = 'couldn\'t'
    saga.next()
    saga.next(true)
    saga.next()
    expect(saga.next(text).value).toEqual(call(predictScore, 'couldn’t'))
    const values = {
       score: 50000,
       percent: 0.5
    }
    saga.next(values)
    expect(saga.next().value).toEqual(fork(submitTurnToAPI, values, 'couldn’t'))
})