import {
    State
} from '../types/state'

export const getUsernameAlreadyTaken = (state: State) => state.login.usernameAlreadyTaken
export const getUpdateUsernameFailed = (state: State) => state.login.updateUserNameFailed
export const getHomeScreenKey = (state: State) => state.login.homeScreenKey
export const getInLogin = (state: State) => state.login.inLogin