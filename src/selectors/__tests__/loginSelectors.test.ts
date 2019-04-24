import {
    getUsernameAlreadyTaken,
    getUpdateUsernameFailed,
    getHomeScreenKey,
    getInLogin
} from '../loginSelectors'
import { State } from '../../types/state'

it('should be able to get if the username has already been taken', () => {
    const state = {
        login: {
            usernameAlreadyTaken: true
        }
    } as State
    expect(getUsernameAlreadyTaken(state)).toBeTruthy()
})

it('should be able to get the state of update user failure.', () => {
    const state = {
        login: {
            updateUserNameFailed: true
        }
    } as State
    expect(getUpdateUsernameFailed(state)).toBeTruthy()
})

it('should be able to get the home screen key', () => {
    const test = 'test'
    const state = {
        login: {
            homeScreenKey: test
        }
    } as State
    expect(getHomeScreenKey(state)).toBe(test)
})

it('should be able to get the inLogin flag', () => {
    const state = {
        login: {
            inLogin: true
        }
    } as State
    expect(getInLogin(state)).toBeTruthy()
})