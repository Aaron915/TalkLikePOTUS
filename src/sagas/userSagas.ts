import { setUser } from './../actions/dataActions'
import { select, call, put } from 'redux-saga/effects'
import { User } from './../types/models'
import { getUser } from '../selectors/dataSelectors'
import { putAPI } from './api'

export function* updateUser(newProps: Partial<User>) {
    const user = yield select(getUser)
    const requestBody = {
        user: {
            ...user,
            ...newProps
        }
    }
    const path = 'user/update'
    const apiResponse = yield call(putAPI, path, requestBody)
    const newUser = apiResponse.response.user
    yield put(setUser(newUser))
}