import { ComposeTurnState } from './../../types/state'
import { setScore, setSubmitScoreError, resetComposeTurnState } from './../../actions/composeTurnActions'
import { setText, setConnectedToInternet } from '../../actions/composeTurnActions'
import composeTurnReducer from '../composeTurnReducer'

it('should be able to set the text of the state', () => {
    const state = {}
    const text = 'random text'
    expect(composeTurnReducer(state, setText(text)).text).toEqual(text)
})

it('should be ale to set the connected to internet state', () => {
    const state = {}
    const connectedToInternet = false
    expect(composeTurnReducer(state, setConnectedToInternet(connectedToInternet)).connectedToInternet).toEqual(connectedToInternet)
})

it('should be able to set the score', () => {
    const state = {}
    const score = 342333
    expect(composeTurnReducer(state, setScore(score)).score).toEqual(score)
})

it('should be able to add an error', () => {
    const state = {
    } as Partial<ComposeTurnState>
    const error = 'random error'
    expect(composeTurnReducer(state, setSubmitScoreError(error)).submitError).toEqual(error)
})

it('should be able to remove an error', () => {
    const state = {
        submitError: 'test'
    } as Partial<ComposeTurnState>
    expect(composeTurnReducer(state, setSubmitScoreError(undefined)).submitError).toBeUndefined()
})

it('should be able to reset all the state when needed', () => {
    const state = {
        text: 'test test test',
        score: 3344
    } as ComposeTurnState
    const newState = composeTurnReducer(state, resetComposeTurnState())
    expect(newState.text).toBeUndefined()
    expect(newState.score).toBeUndefined()
})