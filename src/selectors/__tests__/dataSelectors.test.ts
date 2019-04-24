import { getUserPushNotificationId, getUserUserName } from './../dataSelectors'
import { getUser, getUserHasPushNotificationId, getUsername, getUserFBID, getFriends, getGames, getUserFullName, getUserProfilePicture, getUserID, getUserFirstName } from '../dataSelectors'
import { State } from '../../types/state'
import { loadJSON } from '../../mockData/loadJSON'

describe('user', () => {
    it('should be able to fetch the user', () => {
        const testUser = {_id: '13'}
        const state = {
            data: {
                user: testUser
            }
        } as State
        expect(getUser(state)).toBe(testUser)
    })

    it('should be able to get the current users first na,e', () => {
        const noUsernameUser = loadJSON('login_response_1').response.user
        const state = {
            data: {
                user: noUsernameUser
            }
        } as State
        expect(getUsername(state)).toBeUndefined()

        const usernameUser = loadJSON('update_user_response_1').response.user
        const usernameState = {
            data: {
                user: usernameUser
            }
        } as State
        expect(getUsername(usernameState)).toBe('Aaron')
        expect(getUserFirstName(usernameState)).toBe('Aaron')
    })

    it('should be able to get the users facebook id', () => {
        const noUsernameUser = loadJSON('login_response_1').response.user
        const state = {
            data: {
                user: noUsernameUser
            }
        } as State
        expect(getUserFBID(state)).toBe(noUsernameUser.profiles.facebook)
    })

    it('should return undefined when a users name is not available.', () => {
        const usernameState = {
            data: {
                user: undefined
            }
        } as State
        expect(getUserFullName(usernameState)).toBeUndefined()
    })

    it('should be able to get all properties for a valid user', () => {
        // TODO: collapse most tests into this one.
        const usernameUser = loadJSON('update_user_response_1').response.user
        const usernameState = {
            data: {
                user: usernameUser
            }
        } as State
        expect(getUserFullName(usernameState)).toEqual('Aaron Williams')
        expect(getUserProfilePicture(usernameState)).toEqual('https://graph.facebook.com/10155926051384314/picture?type=large')
        expect(getUserID(usernameState)).toEqual('5a18915a88731610d4f302db')
        expect(getUserUserName(usernameState)).toEqual('Aaron')
    })

    it('should a push notification id if the user has one', () => {
        const user = loadJSON('update_user_response_1').response.user
        const state = {
            data: {
                user: user
            }
        } as State
        expect(getUserPushNotificationId(state)).toEqual('red1234')
        expect(getUserHasPushNotificationId(state)).toEqual(true)
    })

    it('should return undefined if the user does not have a push notification id', () => {
        const user = loadJSON('user_2')
        user.pushNotificationId = undefined
        const state = {
            data: {
                user: user
            }
        } as State
        expect(getUserPushNotificationId(state)).toBeUndefined()
    })
})

describe('Friends', () => {
    it('should be able to get the users friends', () => {
        const friends = loadJSON('user_friends_1').data
        const state = {
            data: {
                friends
            }
        } as State
        expect(getFriends(state)).toBe(friends)
    })
})

describe('games', () => [
    it('should be able to get all the games', () => {
        const game = loadJSON('game')
        const state = {
            data: {
                games: [game]
            }
        } as State
        expect(getGames(state)).toEqual([game])
    })
])