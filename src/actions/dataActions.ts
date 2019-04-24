import { createAction } from 'redux-actions'
import { User, UserFriend, Game } from '../types/models'

export const setUser = createAction('SET_USER', (user: User) => user)
export const addUserFriends = createAction('ADD_USER_FRIENDS', (friends: UserFriend[]) => friends)
// Will assign the profile pic based on the corresponding friend in the array.
export const assignProfilePicInfo = createAction(
    'ASSIGN_PROFILE_PIC_INFO',
    (profilePicMap: { [id: string]: string}) => profilePicMap)
// Fetches data for the app start or login.
export const loadStartData = createAction('LOAD_START_DATA')
// Adds a game into the state. will replace any other instance of this game.
export const addGame = createAction('ADD_GAME', (game: Game) => game)
// removes all current games in the state.
export const clearGames = createAction('CLEAR_GAMES')
// add an array of games to the state.
export const addGames = createAction('ADD_GAMES', (games: Game[]) => games)
// removes a game by id
export const removeGame = createAction('REMOVE_GAME', (gameId: string) => gameId)