import { NextPageParams } from './gamesList'
import { CurrentGameState } from './state'
import { User, UserFriend, Game } from '../types/models'

export interface LoginState {
    fbLoginFailed?: boolean
    // Generic failure for updating the user name.
    updateUserNameFailed?: boolean
    // error when the user name was already taken.
    usernameAlreadyTaken?: boolean,
    // Key to go back to the main screen.
    homeScreenKey?: string,
    // true when the user is in login.
    inLogin: boolean
}

export interface FriendsState {
    // Represents the request for getting hte next page of friends.
    nextPage?: string,
    // True if there was an error when fetching friends.
    fetchFriendsError?: boolean
}

export interface DataState {
    user?: User,
    friends: UserFriend[],
    games: Game[]
}

export interface AuthState {
    bearerToken?: string
}

export interface CurrentGameState {
    gameId?: string,
    startGameError?: any,
    waitingForRandomOpponent: boolean
}

export interface ComposeTurnState {
    text?: string,
    connectedToInternet?: boolean,
    score?: number,
    submitError?: any
}

export interface GamesListState {
    atEndOfGames: boolean,
    nextPageParams?: NextPageParams,
    getGamesError?: any
    fetchingGames: boolean
}

export interface FeaturePromptState {
    hasSeenNotificationPrompt: boolean,
    hasSeenTutorialPrompt: boolean
}

export interface State {
    nav: any,
    login: LoginState,
    data: DataState,
    auth: AuthState,
    friends: FriendsState,
    currentGame: CurrentGameState,
    composeTurn: ComposeTurnState,
    gamesList: GamesListState
    featurePrompt: FeaturePromptState
}