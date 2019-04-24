import { NextPageParams } from './../types/gamesList'
import { createAction } from 'redux-actions'

export const fetchGames = createAction('FETCH_GAMES', (clearExisting: boolean = false) => clearExisting)
// Used to indicate that the user has reached the end of their games.
export const setAtEndOfGames = createAction('SET_AT_END_OF_GAMES', (atEndOfGames: boolean) => atEndOfGames)
export const setNextPageParams = createAction('SET_NEXT_PAGE_PARAMS', (updatedAt: number, pageLimit: number, pageNumber: number) => {
    return {
        updatedAt,
        pageLimit,
        pageNumber
    } as NextPageParams
})
export const clearNextPageParams = createAction('CLEAR_NEXT_PAGE_PARAMS')
// Sets the error if something went wrong getting games.
export const setGetGamesError = createAction('SET_GET_GAMES_ERROR', (error: any) => error)
export const resetState = createAction('RESET_STATE')
export const setIsFetchingGames = createAction('IS_FETCHING_GAMES', (isFetching: boolean) => isFetching)
export const declineGame = createAction('DECLINE_GAME', (gameID: string) => gameID)