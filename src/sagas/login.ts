import { loadStartData } from './../actions/dataActions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setUser } from '../actions/dataActions'
// import { setBearerToken } from '../actions/authActions'
import { setFbAuthToken, usernameAlreadyTaken } from '../actions/loginActions'
import { updateUser } from './userSagas'
import {
    fbAuthFailed,
    clearFBAuthFailedError,
    setUserName,
    clearUpdateUserNameError,
    updateUserNameFailed,
    clearUserNameAlreadyTaken
 } from '../actions/loginActions'
 import { setBearerToken } from '../actions/authActions'
import { getAPI } from './api'

export function* authenticateWithFacebook(action) {
    yield put(clearFBAuthFailedError())
    const token: string = action.payload
    const path = 'auth/facebook'
    const query = {
        authenticationToken: token
    }
    try {
        const response = yield call(getAPI, path, query)
        const bearer = response.response.Bearer
        const newUser = response.response.user
        yield put(setUser(newUser))
        yield put(setBearerToken(bearer))
        yield put(loadStartData())
    } catch (err) {
        console.warn(err)
        yield put(fbAuthFailed())
    }
}

export function* updateUserName(action) {
    yield put(clearUpdateUserNameError())
    yield put(clearUserNameAlreadyTaken())
    try {
        const username: string = action.payload
        yield call(updateUser, {username})
    } catch (err) {
        if (err.meta && err.meta.status === 'username_already_taken') {
            yield put(usernameAlreadyTaken())
        } else {
            yield put(updateUserNameFailed())
        }
    }
}

export function* loginSaga() {
    yield takeLatest(setUserName.toString(), updateUserName)
    yield takeLatest(setFbAuthToken.toString(), authenticateWithFacebook)
}
