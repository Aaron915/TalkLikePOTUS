import { getNextFriends, clearFetchFriendsError, setFetchFriendsError, setNextPage } from '../actions/friendsActions'
import { select, call, put, throttle } from 'redux-saga/effects'
import { getNextPage } from '../selectors/friendsSelectors'
import { graphRequest, batchRequests } from './fbGraphSaga'
import { addUserFriends, assignProfilePicInfo } from '../actions/dataActions'
import { UserFriend } from '../types/models'
import { userProfilePicParams } from '../utils/shared/fbUtils'

export function* getFriends() {
    yield put(clearFetchFriendsError())
    const friendsPath = 'me/friends'
    try {
        // Fetch the users friends
        const nextPageParams = yield select(getNextPage)
        let results
        if (!nextPageParams) {
            results = yield call(graphRequest, friendsPath, nextPageParams)
        } else {
            const response = yield call(fetch, nextPageParams)
            results = yield response.json()
        }

        const users = results.data as UserFriend[]
        yield put(addUserFriends(users))
        if (results.paging && results.paging.next) {
            yield put(setNextPage(results.paging.next))
        }

        if (users.length === 0) {
            return undefined
        }
        // Make request to get friend's photos.
        const allUsersProfilePicParams = users.map(user => userProfilePicParams(user))
        const result = yield call(batchRequests, allUsersProfilePicParams)
        const responses = result as any[]
        // Maps the user id to its pictureData
        let profilePicMap: { [id: string]: string} = {}
        responses.forEach((profilePicResponse, idx) => {
            // The response is returned as a redirect.
            if (!profilePicResponse.data || !profilePicResponse.data.url) {
                console.warn(`Unable to retrieve pic data for ${users[idx]}`)
                return
            }
            const user = users[idx]
            const location = profilePicResponse.data.url
            profilePicMap[user.id] = location
        })

        yield put(assignProfilePicInfo(profilePicMap))
    } catch (err) {
        console.warn(err)
        yield put(setFetchFriendsError())
    }
}

export function* friendsSaga() {
    yield throttle(2000, getNextFriends.toString(), getFriends)
}