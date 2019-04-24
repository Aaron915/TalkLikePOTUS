import { removeGame } from './../actions/dataActions'
import { handleActions } from 'redux-actions'
import {
    DataState
} from '../types/state'
import {
    User,
    UserFriend,
    Game
} from '../types/models'
import {
    setUser,
    addUserFriends,
    assignProfilePicInfo,
    addGame,
    clearGames,
    addGames
} from '../actions/dataActions'
import _ from 'lodash'

const initialState: DataState = {
    user: undefined,
    games: [],
    friends: []
}

export default handleActions({
    [setUser](state: DataState, action): DataState {
        const user: User = action.payload
        return {...state, user}
    },
    [addUserFriends](state: DataState, action): DataState {
        const friends = state.friends.slice()
        const combinedFriends = friends.concat((action.payload as UserFriend[]))
        // Make sure we filter by id so that we never have the same friend twice.
        const filteredFriends = _.uniqBy(combinedFriends, (friend: UserFriend) => friend.id)
        return {...state, friends: filteredFriends}
    },
    [assignProfilePicInfo](state: DataState, action): DataState {
        const friends = state.friends.slice()
        const profilePicMap: { [id: string]: string} = action.payload

        let updatedFriends = friends.map((friend) => {
            const profilePicture = profilePicMap[friend.id]
            if (profilePicture) {
                return {...friend, profilePicture}
            } else {
                return friend
            }
        })

        return {...state, friends: updatedFriends}
    },
    [addGame](state: DataState, action): DataState {
        const gameToAdd: Game = action.payload
        const games = state.games.slice()
        const filteredGames = games.filter(game => game._id !== gameToAdd._id)
        filteredGames.unshift(gameToAdd)
        return {...state, games: filteredGames}
    },
    [clearGames](state:  DataState): DataState {
        return {...state, games: []}
    },
    [addGames](state: DataState, action):  DataState {
        const newGames = action.payload
        let existingGames = state.games.slice()
        // Remove previous versions of the game.
        newGames.forEach(newGame => {
            existingGames = existingGames.filter(game => game._id !== newGame._id)
        })
        const games = existingGames.concat(newGames)
        return {...state, games }
    },
    [removeGame](state: DataState, action): DataState {
        const filteredGames = state.games.slice().filter(game => game._id !== action.payload)
        return {...state, games: filteredGames}
    }
}, initialState)