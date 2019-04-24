import { createAction } from 'redux-actions'

export const setFbAuthToken = createAction('SET_FB_AUTH_TOKEN', (token: string) => token)
export const setUserName = createAction('SET_USER_NAME', (userName: string) => userName)
export const fbAuthFailed = createAction('FB_AUTH_FAILED')
export const updateUserNameFailed = createAction('UPDATE_USER_NAME_FAILED')
export const usernameAlreadyTaken = createAction('USERNAME_ALREADY_TAKEN')
export const clearFBAuthFailedError = createAction('CLEAR_FB_AUTH_FAIED')
export const clearUpdateUserNameError = createAction('CLEAR_UPDATE_USER_NAME_ERROR')
export const clearUserNameAlreadyTaken = createAction('CLEAR_USERNAME_ALREADY_TAKEN')
// Sets the key for the main screen for when login is dismissed.
export const setHomeScreenKey = createAction('SET_HOME_SCREEN_KEY', (key: string) => key)
// Used to track when the user is in login.
export const userEnteringLogin = createAction('USER_ENTERING_LOGIN')
// tracks when the user is leaving login.
export const userLeavingLogin = createAction('USER_LEAVING_LOGIN')