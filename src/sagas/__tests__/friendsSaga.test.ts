import {
    friendsSaga,
    getFriends
} from '../friendsSaga'
import {
    getNextFriends, clearFetchFriendsError, setNextPage, setFetchFriendsError
} from '../../actions/friendsActions'
import { takeLatest, select, call, put, throttle } from 'redux-saga/effects'
import { getNextPage } from '../../selectors/friendsSelectors'
import { graphRequest, batchRequests } from '../fbGraphSaga'
import { loadJSON } from '../../mockData/loadJSON'
import { addUserFriends, assignProfilePicInfo } from '../../actions/dataActions'
import { userProfilePicParams, FBGraphRequestType } from '../../utils/shared/fbUtils'

it('should listen for all friends sagas', () => {
    const saga = friendsSaga()
    expect(saga.next().value).toEqual(throttle(2000, getNextFriends.toString(), getFriends))
})
it('should throw an error if something goes during the fetch', () => {
    const saga = getFriends()
    saga.next()
    saga.next()
    expect(saga.throw('error').value).toEqual(put(setFetchFriendsError()))
})

// TODO: Add a test that can handle paging in the response.
// TODO: Add a test that handles a response with 0 users.

it('should be able to go through the proper steps when data is retrieved', () => {
    const saga = getFriends()
    expect(saga.next().value).toEqual(put(clearFetchFriendsError()))
    expect(saga.next().value).toEqual(select(getNextPage))
    expect(saga.next().value).toEqual(call(graphRequest, 'me/friends', undefined))
    const userFriendsResponse = loadJSON('user_friends_1')
    expect(saga.next(userFriendsResponse).value)
        .toEqual(put(addUserFriends(userFriendsResponse.data)))
    const allUsersProfilePicParams = userFriendsResponse.data.map(user => userProfilePicParams(user))
    expect(saga.next().value).toEqual(call(batchRequests, allUsersProfilePicParams))
    const profilePicData = loadJSON('friends_profile_pic_response')
    const data = {
        '10155838103539265':
        'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/22728880_10155804124074265_7840011817798697909_n.jpg?oh=e0058be6947b7687eba16d7c356d1abd&oe=5A95B109'
    }
     expect(saga.next(profilePicData).value).toEqual(put(assignProfilePicInfo(data))
})

// TODO: Find a better way to test this.
// it('should be able to use the next page params for a request', () => {
//     const fetch = jest.fn(() => new Promise(resolve => resolve()))
//     const saga = getFriends()
//     const nextPageParams = 'www.facebook.com'
//     saga.next()
//     saga.next()
//     expect(saga.next(nextPageParams).value).toEqual(call(fetch, nextPageParams))
// })