import { setAtEndOfGames, clearNextPageParams, setNextPageParams, setGetGamesError, resetState, setIsFetchingGames } from './../actions/gamesListActions'
import { handleActions } from 'redux-actions'
import { GamesListState } from './../types/state'

const initialState: GamesListState = {
    atEndOfGames: false,
    nextPageParams: undefined,
    getGamesError: undefined,
    fetchingGames: false
}

export default handleActions({
    [setAtEndOfGames](state: GamesListState, action): GamesListState {
        return { ...state, atEndOfGames: action.payload}
    },
    [setNextPageParams](state: GamesListState, action): GamesListState {
        return { ...state, nextPageParams: action.payload}
    },
    [setGetGamesError](state: GamesListState, action): GamesListState {
        return { ...state, getGamesError: action.payload}
    },
    [resetState](): GamesListState {
        return {...initialState}
    },
    [setIsFetchingGames](state: GamesListState, action): GamesListState {
        return {...state, fetchingGames: action.payload}
    },
    [clearNextPageParams](state: GamesListState, _action): GamesListState {
        return {...state, nextPageParams: undefined}
    }
}, initialState)