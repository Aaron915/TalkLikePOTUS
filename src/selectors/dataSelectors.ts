import {
    State
} from '../types/state'
import {
    User, UserFriend, Game
} from '../types/models'
import { createSelector } from 'reselect'

export const getUser = (state: State) => state.data.user
export const getFriends: (state: State) => UserFriend[] = state => state.data.friends
export const getGames: (state: State) => Game[]  = state => state.data.games

export const getUsername: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        if (user) {
            return user.username
        }

        return undefined
    }
)

export const getUserFirstName: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user.firstName
    }
)

export const getUserFullName: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user.firstName && user.lastName && `${user.firstName} ${user.lastName}`
    }
)

export const getUserProfilePicture: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user.profilePicture
    }
)

export const getUserFBID: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user.profiles && user.profiles.facebook
    }
)

export const getUserID: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user._id
    }
)

export const getUserPushNotificationId: (state: State) => string | undefined = createSelector(
    getUser,
    (user: User) => {
        return user && user.pushNotificationId
    }
)

export const getUserHasPushNotificationId: (state: State) => boolean = createSelector(
    getUserPushNotificationId,
    (notificationID: string) => {
        return notificationID !== undefined
    }
)

export const getUserUserName: (state: State) => string = createSelector(
    getUser,
    (user?: User) => {
        return user && user.username
    }
)