import { FBGraphRequest, executeRequests } from './../utils/shared/fbUtils'
import { executeRequest, FBGraphRequestType } from '../utils/shared/fbUtils'
import { call } from 'redux-saga/effects'
export function* graphRequest(path: string, params?: any, type?: FBGraphRequestType) {
    try {
        const result = yield call(executeRequest, path, type, params)
        return result
    } catch (err) {
        // TODO: if permissions error, log the user out of facebook.
        throw err
    }
}

export function* batchRequests(requests: FBGraphRequest[]) {
    try {
        const result = yield call(executeRequests, requests)
        return result
    } catch (err) {
        // TODO: if permissions error, log the user out of facebook.
        throw err
    }
}