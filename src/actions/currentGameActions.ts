import { createAction } from 'redux-actions'

// First action involved with finding a random game.
export const startRandomGame = createAction('START_RANDOM_GAME')
// First action for starting a game with a user name.
export const startGameWithUsername = createAction('START_GAME_WITH_USER_NAME', (username: string) => username)
// First action for starting a game with a facebook friend.
export const startGameWithFriend = createAction('START_GAME_WITH_FRIEND', (friendFBID: string) => friendFBID)
// First action for starting a game with a opponent id.
export const startGameWithUser = createAction('START_GAME_WITH_USER', (userID: string) => userID)
// Sets the id for the current game
export const setCurrentGameID = createAction('SET_CURRENT_GAME_ID', (gameId: string) => gameId)
// Sets error if something went wrong when starting a game. Doesn't handle wrong usernames.
export const setStartGameError = createAction('START_GAME_ERROR', (error?: any) => error)
// Sets a flag that the user must wait for another player for this game
export const setWaitingForRandomOpponent = createAction('SET_WAITING_FOR_RANDOM_OPPONENT', (waiting: boolean) => waiting)
// Resets all the state related to the current game
export const resetCurrentGame = createAction('RESET_CURRENT_GAME')
// Sets the current game and fetches it
export const retrieveCurrentGame = createAction('RETRIEVE_CURRENT_GAME', (gameId) => gameId)
// forfeits the opponent
export const forfeitOpponent = createAction('FORFEIT_OPPONENT')
// forfeits the user
export const forfeitUser = createAction('FORFEIT_USER')