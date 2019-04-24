import { handleActions } from 'redux-actions'
import {
    AuthState
} from '../types/state'
import {
    setBearerToken
} from '../actions/authActions'

export default handleActions({
    [setBearerToken](state: AuthState, action: any): AuthState {
        return {...state, bearerToken: action.payload}
    }
}, {})