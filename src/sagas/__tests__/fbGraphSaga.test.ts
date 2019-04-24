import { graphRequest, batchRequests } from '../fbGraphSaga'
import { call } from 'redux-saga/effects'
import { executeRequest, FBGraphRequestType, executeRequests } from '../../utils/shared/fbUtils'
import { loadJSON } from '../../mockData/loadJSON'

it('should be able to make a graph request', () => {
    const path = 'me/friends'
    const request = graphRequest(path, undefined, undefined)
    expect(request.next().value).toEqual(call(executeRequest, path, undefined, undefined))
    const response = loadJSON('user_friends_1')
    expect(request.return(response).value).toBe(response)
})

it('should be able to handle thrown error for single request', () => {
    const path = 'me/friends'
    const request = graphRequest(path)
    request.next()
    const error = loadJSON('fb_error_1')
    expect(() =>  {
        request.throw(error)
    }).toThrow()
})

it('should be able to handle batch requests', () => {
    const requests = [
        {
            path: 'test',
            type: FBGraphRequestType.GET
        },
        {
            path: 'test2',
            type: FBGraphRequestType.POST
        }
    ]

    const request = batchRequests(requests)
    expect(request.next().value).toEqual(call(executeRequests, requests))
})

it('should be able to handle errors from a batch request', () => {
    const requests = [
        {
            path: 'test',
            type: FBGraphRequestType.GET
        },
        {
            path: 'test2',
            type: FBGraphRequestType.POST
        }
    ]

    const request = batchRequests(requests)
    request.next()
    const error = loadJSON('fb_error_1')
    expect(() =>  {
        request.throw(error)
    }).toThrow()
})