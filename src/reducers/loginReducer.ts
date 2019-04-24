import { handleActions } from 'redux-actions'
import {
    fbAuthFailed,
    clearFBAuthFailedError,
    updateUserNameFailed,
    usernameAlreadyTaken,
    clearUpdateUserNameError,
    clearUserNameAlreadyTaken,
    setHomeScreenKey,
    userEnteringLogin,
    userLeavingLogin
} from '../actions/loginActions'
import { LoginState } from './../types/state'

const initialState: LoginState = {
    inLogin: false
}

export default handleActions({
    [fbAuthFailed](state: LoginState, _action): LoginState {
        return {...state, fbLoginFailed: true}
    },
    [clearFBAuthFailedError](state: LoginState, _action): LoginState {
        if (state.fbLoginFailed) {
            return { ...state, fbLoginFailed: undefined}
        } else {
            return state
        }
    },
    [updateUserNameFailed](state: LoginState, _action): LoginState {
        return {...state, updateUserNameFailed: true}
    },
    [clearUpdateUserNameError](state: LoginState, _action): LoginState {
        return {...state, updateUserNameFailed: undefined}
    },
    [usernameAlreadyTaken](state: LoginState, _action: LoginState) {
        return {...state, usernameAlreadyTaken: true}
    },
    [clearUserNameAlreadyTaken](state: LoginState, _action): LoginState {
        return {...state, usernameAlreadyTaken: undefined}
    },
    [setHomeScreenKey](state: LoginState, action): LoginState {
        return {...state, homeScreenKey: action.payload}
    },
    [userEnteringLogin](state: LoginState, _action): LoginState {
        return {...state, inLogin: true}
    },
    [userLeavingLogin](state: LoginState, _action): LoginState {
        return {...state, inLogin: false}
    }
}, initialState)