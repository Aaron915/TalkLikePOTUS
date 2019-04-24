import loginReducer from '../loginReducer'
import {
    setUserName,
    fbAuthFailed,
    clearFBAuthFailedError,
    updateUserNameFailed,
    clearUpdateUserNameError,
    usernameAlreadyTaken,
    clearUserNameAlreadyTaken,
    setHomeScreenKey,
    userEnteringLogin,
    userLeavingLogin
} from '../../actions/loginActions'

it('should update correctly if a fb authentication fails', () => {
    const state = loginReducer(undefined, fbAuthFailed())
    expect(state.fbLoginFailed).toBeTruthy()
})

it('should clear the fb auth failure', () => {
    const state = loginReducer({fbAuthFailed: true}, clearFBAuthFailedError())
    expect(state.fbLoginFailed).toBeUndefined()
})

it('should be able to set the update user name error', () => {
    const state = loginReducer(undefined, updateUserNameFailed())
    expect(state.updateUserNameFailed).toBeTruthy()
})

it('should be able to clear the update user name error', () => {
    const state = loginReducer({updateUserNameFailed: true}, clearUpdateUserNameError())
    expect(state.updateUserNameFailed).toBeUndefined()
})

it('should update if the username has already been taken', () => {
    const state = loginReducer({}, usernameAlreadyTaken())
    expect(state.usernameAlreadyTaken).toBeTruthy()
})

it('should clear the already taken username flag', () => {
    const state = loginReducer({usernameAlreadyTaken: true}, clearUserNameAlreadyTaken())
    expect(state.usernameAlreadyTaken).toBeUndefined()
})

it('should be able to set the key to get back to the main screen', () => {
    const test = 'test'
    const state = loginReducer({}, setHomeScreenKey(test))
    expect(state.homeScreenKey).toBe(test)
})

it('should be able to track when the user has entered login', () => {
    const state = loginReducer({inLogin: false}, userEnteringLogin())
    expect(state.inLogin).toBeTruthy()
})

it('Should be able to track when the user leaves the login', () => {
    const state = loginReducer({inLogin: true}, userLeavingLogin())
    expect(state.inLogin).toBeFalsy()
})