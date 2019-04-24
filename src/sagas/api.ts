import { call, select } from 'redux-saga/effects'
import { getBearerTokenHeader } from '../selectors/authSelectors'
const base = 'https://[REDACTED].com'
const fullBaseURL = base + '/api/v1/'
const contentType = 'application/json'

function queryString(params: any): string {
    let fullQuery = '?'

    for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
            let query = ''
            if (fullQuery !== '?') {
                query += '&'
            }
            query += `${prop}=${params[prop]}`
            fullQuery += query
        }
    }

    return fullQuery
}

export function* getAPI(path: string, params: any, requiresAuth: boolean = true): any {
    let fullPath = path
    if (params) {
        fullPath += queryString(params)
    }

    const options = {
        method: 'GET'
    }
    const response = yield call(request, fullPath, options, requiresAuth)
    return response
}

export function* putAPI(path: string, body: any): any {
    const options = {
        method: 'PUT',
        body: JSON.stringify(body)
    }

    const response = yield call(request, path, options, true)
    return response
}

export function* postAPI(path: string, body: any): any {
    const options = {
        method: 'POST',
        body: JSON.stringify(body)
    }

    const response = yield call(request, path, options, true)
    return response
}

export function* request(path: string, options: any, requiresAuth: boolean): any {

    let headers = {
        'Content-Type': contentType,
        'Authorization': undefined
    }

    if (requiresAuth) {
        const authHeader = yield select(getBearerTokenHeader)
        headers.Authorization = authHeader
    }
    options.headers = headers
    const response = yield call(fetch, fullBaseURL + path, options)
    const json = yield response.json()
    console.log(options)
    console.log(path)
    if (response.ok) {
        return json
    } else {
        console.log(json)
        throw json
    }
}