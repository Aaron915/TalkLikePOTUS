import { handleActions, combineActions } from 'redux-actions'
import { FriendsState } from '../types/state'
import { setNextPage, clearFetchFriendsError, setFetchFriendsError } from '../actions/friendsActions'

const initialState: FriendsState = {}

export default handleActions({
    [setNextPage](state: FriendsState, action): FriendsState {
        return {...state, nextPage: action.payload}
    },
    [combineActions(clearFetchFriendsError, setFetchFriendsError)](state: FriendsState, action): FriendsState {
        const fetchFriendsError = action.type === setFetchFriendsError.toString() ? true : undefined
        return {...state, fetchFriendsError}
    }
}, initialState)