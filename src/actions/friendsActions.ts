import { createAction } from 'redux-actions'

export const getNextFriends = createAction('GET_NEXT_FRIENDS')
export const setNextPage = createAction('SET_NEXT_PAGE', (pageRequest?: string) => pageRequest)
export const clearFetchFriendsError = createAction('CLEAR_FETCH_FRIENDS_ERROR')
export const setFetchFriendsError = createAction('SET_FETCH_FRIENDS_ERROR')