import { GraphRequestManager, GraphRequest, AccessToken } from 'react-native-fbsdk'
import { UserFriend } from '../../types/models'

export enum FBGraphRequestType {
    GET = 'GET',
    POST = 'POST'
}

export interface FBGraphRequest {
    path: string,
    type: FBGraphRequestType,
    parameters?: any
}

export async function executeRequest(path: string, type: FBGraphRequestType, parameters?: any) {
    const request = {
        path,
        type,
        parameters
    }

    const results = await executeRequests([request])
    const firstResult = results[0]
    if (firstResult.error) {
        throw firstResult.error
    }
    return firstResult
}

export async function executeRequests(requests: FBGraphRequest[]) {
    let results = []

    const accessToken = await fbAccessToken()

    let fbRequests = requests.map((req, idx) => {
        const fbCallback = (err, result) => {
            if (err) {
                console.warn(`fb request error ${JSON.stringify(err)}`)
                results.push({idx, result: err})
            } else {
                results.push({idx, result})
            }
        }
        const options = {
            httpMethod: req.type,
            version: 'v2.11',
            parameters: req.parameters,
            accessToken
        }
        return new GraphRequest(req.path, options, fbCallback)
    })

    let requestManager = new GraphRequestManager()
    fbRequests.forEach(req => {
        requestManager = requestManager.addRequest(req)
    })

    return await new Promise((res, rej) => {
        requestManager.addBatchCallback((err, {result}) => {
            if (result === 'success' || result === 'batch finished executing or timed out') {
                const sortedResults = results.sort((first, second) => { return first.idx - second.idx })
                const removedIdxResults = sortedResults.map(sortedResult => sortedResult.result)
                res(removedIdxResults)
            } else {
                rej(err)
            }
        }).start()
    })
}

// Builds the parameters for when requests to retrieve profile pics is created.
export function userProfilePicParams(user: UserFriend): FBGraphRequest {
    const path = `${user.id}/picture?redirect=false`
    return {
        type: FBGraphRequestType.GET,
        path: path
    }
}

async function fbAccessToken() {
    const token = await AccessToken.getCurrentAccessToken()
    return token.accessToken
}
