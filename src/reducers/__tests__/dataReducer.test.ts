import { addGames, clearGames, removeGame } from './../../actions/dataActions'
import {
    loadJSON
} from '../../mockData/loadJSON'
import dataReducer from '../dataReducer'
import {
    setUser,
    addUserFriends,
    assignProfilePicInfo,
    addGame
} from '../../actions/dataActions'

it('should correctly set the user', () => {
    const user = loadJSON('login_response_1').response.user
    const state = dataReducer({}, setUser(user))
    expect(state.user).toEqual(user)
})

it('should be able to add the users friends', () => {
    const state = {
        friends: []
    }
    const friends = loadJSON('user_friends_1').data
    const result = dataReducer(state, addUserFriends(friends)).friends
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Adam Bailey')
    expect(result[0].id).toBe('10155838103539265')
})

it('should reject users with the same ID', () => {
    const state = {
        friends: []
    }
    const friends1 = loadJSON('user_friends_1').data
    let friends2 = loadJSON('user_friends_1').data
    const result = dataReducer(state, addUserFriends(friends2.concat(friends1))).friends
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Adam Bailey')
    expect(result[0].id).toBe('10155838103539265')
})

it('should be able to assign profile pic data to a friend', () => {
    const friends1 = loadJSON('user_friends_1').data
    const state = {
        friends: friends1
    }
    const friends2 = loadJSON('user_friends_1').data
    const profilePicURL = 'www.facebook.com'
    const map = {[friends2[0].id]: profilePicURL}
    const newState = dataReducer(state, assignProfilePicInfo(map))
    const friend = newState.friends[0]
    expect(friend.profilePicture).toEqual(profilePicURL)
    expect(friend.name).toBeDefined()
    expect(friend.id).toBeDefined()
})

it('should handle if the users id is not available', () => {
    const friends1 = loadJSON('user_friends_1').data
    const state = {
        friends: friends1
    }
    const profilePicURL = 'www.facebook.com'
    const map = {}
    const newState = dataReducer(state, assignProfilePicInfo(map))
    const friend = newState.friends[0]
    expect(friend.profilePicture).toBeUndefined()
    expect(friend.name).toBeDefined()
    expect(friend.id).toBeDefined()
})

it('should be able to add a game', () => {
    const game = loadJSON('new_game_response').response.game
    const state = {
        games: []
    }
    const newState = dataReducer(state, addGame(game))
    expect(newState.games[0]).toBe(game)
})

it('should replace the old instance of a game if a new one is added', () => {
    const oldGame = loadJSON('new_game_response').response.game
    const newGame = loadJSON('new_game_response').response.game
    newGame.test = true
    const state = {
        games: [oldGame]
    }
    const newState = dataReducer(state, addGame(newGame))
    expect(newState.games[0].test).toBe(newGame.test)
    expect(newState.games.length).toEqual(1)
})

it('should be able to clear games', () => {
    const newGame = loadJSON('new_game_response').response.game
    const gamesList = loadJSON('games_list_response').response.games
    const state = {
        games: [newGame]
    }
    const newState = dataReducer(state, clearGames())
    expect(newState.games.length).toBe(0)
})

it('should be able to add games', () => {
    const newGame = loadJSON('new_game_response').response.game
    const gamesList = loadJSON('games_list_response').response.games
    const state = {
        games: [newGame]
    }
    const newState = dataReducer(state, addGames(gamesList))
    expect(newState.games.length).toBe(21)
    expect(newState.games).toContain(newGame)
})

it('should remove old versions of games when adding a new one', () => {
    const oldGamesList = loadJSON('games_list_response').response.games
    const newGamesList = loadJSON('games_list_response').response.games
    const state = {
        games: oldGamesList
    }
    const newState = dataReducer(state, addGames(newGamesList))
    expect(newState.games.length).toEqual(20)
})

it('should be able to remove a game', () => {
    const games = loadJSON('games_list_response').response.games
    const state = {
        games
    }
    const newState = dataReducer(state, removeGame('5a41c8e023c67aacdb337799'))
    expect(newState.games.length).toEqual(19)
})