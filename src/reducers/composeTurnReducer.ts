import { handleActions } from 'redux-actions'
import { setText, setConnectedToInternet, setScore, setSubmitScoreError, resetComposeTurnState } from '../actions/composeTurnActions'
import { ComposeTurnState } from '../types/state'

const initialState: ComposeTurnState = {
    text: undefined,
    connectedToInternet: undefined,
    score: undefined,
    submitError: undefined
}

export default handleActions({
    [setText](state: ComposeTurnState, action: any): ComposeTurnState {
        return {...state, text: action.payload}
    },
    [setConnectedToInternet](state: ComposeTurnState, action: any): ComposeTurnState {
        return {...state, connectedToInternet: action.payload}
    },
    [setScore](state: ComposeTurnState, action: any): ComposeTurnState {
        return {...state, score: action.payload}
    },
    [setSubmitScoreError](state: ComposeTurnState, action: any): ComposeTurnState {
        return {...state, submitError: action.payload}
    },
    [resetComposeTurnState](): ComposeTurnState {
        return {...initialState}
    }
}, initialState)