import friendsReducer from '../friendsReducer'
import { setNextPage, setFetchFriendsError, clearFetchFriendsError } from '../../actions/friendsActions'

it('should be able to set the next page to a valid value', () => {
    const nextPage = 'testing'
    const state = friendsReducer({}, setNextPage(nextPage))
    expect(state.nextPage).toBe(nextPage)
})

it('should be able to set the next page to a undefined value', () => {
    const state = friendsReducer({}, setNextPage(undefined))
    expect(state.nextPage).toBeUndefined()
})

it('should be able to set the fetchFriends Error', () => {
    expect(friendsReducer({}, setFetchFriendsError()).fetchFriendsError).toBeTruthy()
})

it('should be able to clear a fetch friends error', () => {
    const state = {
        fetchFriendsError: true
    }
    expect(friendsReducer(state, setFetchFriendsError()).clearFetchFriendsError).toBeFalsy()
})