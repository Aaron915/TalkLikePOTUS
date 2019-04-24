import {
    takeLatest,
    call,
    put,
    select
} from 'redux-saga/effects'
import {
    setFbAuthToken,
    setUserName,
    fbAuthFailed,
    clearFBAuthFailedError,
    clearUpdateUserNameError,
    updateUserNameFailed,
    clearUserNameAlreadyTaken,
    usernameAlreadyTaken
} from '../../actions/loginActions'
import { loadStartData } from '../../actions/dataActions'
import {
    setUser
} from '../../actions/dataActions'
import {
    setBearerToken
} from '../../actions/authActions'
import {
    authenticateWithFacebook,
    updateUserName,
    loginSaga
} from '../login'
import { loadJSON } from '../../mockData/loadJSON'
import {
    getAPI, putAPI
} from '../api'
import {
    getUser
} from '../../selectors/dataSelectors'
import { updateUser } from '../userSagas'

describe('root login saga', () => {
    it('should listen for updates', () => {
        const login = loginSaga()
        expect(login.next().value).toEqual(takeLatest(setUserName.toString(), updateUserName))
        expect(login.next().value).toEqual(takeLatest(setFbAuthToken.toString(), authenticateWithFacebook))
    })
})

describe('Authenticating with facebook', () => {

    it('should set the bearer and user corrrectly upon a sucessful login.', () => {
        const response = loadJSON('login_response_1')
        const fakeToken = 'sgfgfdsg'
        const generator = authenticateWithFacebook(setFbAuthToken(fakeToken))
        expect(generator.next().value).toEqual(put(clearFBAuthFailedError()))
        expect(generator.next().value).toEqual(call(getAPI, 'auth/facebook', {authenticationToken: fakeToken}))
        expect(generator.next(response).value).toEqual(put(setUser(response.response.user)))
        expect(generator.next(response).value).toEqual(put(setBearerToken(response.response.Bearer)))
        expect(generator.next().value).toEqual(put(loadStartData()))
    })

    it('should dispatch an error if something went wrong.', () => {
        const fakeToken = 'sgfgfdsg'
        const generator = authenticateWithFacebook(setFbAuthToken(fakeToken))
        generator.next()
        generator.next()
        expect(generator.throw({ error: 'test'}).value).toEqual(put(fbAuthFailed()))
    })
})

describe('updating the user name', () => {

    it('should update the user correctly if the response was correct', () => {
        const username = 'Aaron'
        const generator = updateUserName(setUserName(username))
        expect(generator.next().value).toEqual(put(clearUpdateUserNameError()))
        expect(generator.next().value).toEqual(put(clearUserNameAlreadyTaken()))
        expect(generator.next().value).toEqual(call(updateUser, { username }))
    })

    it('should handle errors if the request was not successful', () => {
        const username = 'Aaron'
        const generator = updateUserName(setUserName(username))
        generator.next()
        generator.next()
        generator.next()
        expect(generator.throw({error: 'test'}).value).toEqual(put(updateUserNameFailed()))
    })

    it('should throw the correct error for the username already being taken', () => {
        const username = 'Aaron'
        const generator = updateUserName(setUserName(username))
        generator.next()
        generator.next()
        generator.next()
        expect(generator.throw({
            meta: {
                code: 401,
                status: 'username_already_taken'
            }
        }).value).toEqual(put(usernameAlreadyTaken()))
    })
})