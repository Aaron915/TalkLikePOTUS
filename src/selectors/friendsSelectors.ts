import { createSelector } from 'reselect'
import {
    State
} from '../types/state'
import { getFriends } from './dataSelectors'
import { UserFriend } from '../types/models'
export const getNextPage = (state: State) => state.friends.nextPage
export const getFriendsSectionData = createSelector(getFriends, (friends: UserFriend[]) => {
    return friends.map(friend => {
        return {
            key: friend.id,
            name: friend.name,
            imageUrl: friend.profilePicture
        }
    })
})