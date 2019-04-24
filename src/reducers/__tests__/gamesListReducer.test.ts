import { setAtEndOfGames, setGetGamesError, resetState, setIsFetchingGames, clearNextPageParams } from './../../actions/gamesListActions'
import { GamesListState } from './../../types/state'
import gamesListReducer  from './../gamesListReducer'
import { setNextPageParams } from '../../actions/gamesListActions'
it('should be able to toggle the atEnd state', () => {
    const state = {
        atEndOfGames: false
    } as GamesListState
    const nextpageParams = {
        updatedAt: 12344,
        pageLimit: 20
    }
    const newState = gamesListReducer(state, setAtEndOfGames(true))
    expect(newState.atEndOfGames).toEqual(true)
})

it('should be able to set the next page params', () => {
    const state = {
        atEndOfGames: false
    } as GamesListState
    const nextpageParams = {
        updatedAt: 12344,
        pageLimit: 20,
        pageNumber: 2
    }
    const newState = gamesListReducer(state, setNextPageParams(nextpageParams.updatedAt, nextpageParams.pageLimit, nextpageParams.pageNumber))
    expect(newState.nextPageParams).toEqual(nextpageParams)
})

it('should be able to clear the next page params', () => {
    const nextpageParams = {
        updatedAt: 12344,
        pageLimit: 20,
        pageNumber: 2
    }
    const state = {
        nextPageParams: nextpageParams
    } as GamesListState
    const newState = gamesListReducer(state, clearNextPageParams())
    expect(newState.nextPageParams).toBeUndefined()
})

it('should be able to set the get games error if needed', () => {
    const state = {
        atEndOfGames: false
    }  as GamesListState
    const error = {
        test: 'test'
    }
    const newState = gamesListReducer(state, setGetGamesError(error))
    expect(newState.getGamesError).toEqual(error)
})

it('should be able to reset the gamesList state', () => {
    const state = {
        atEndOfGames: true
    }  as GamesListState
    const newState = gamesListReducer(state, resetState())
    expect(newState.atEndOfGames).toEqual(false)
})

it('should be able to set the is fetching flag', () => {
    const state = {
        fetchingGames: false
    }  as GamesListState
    const newState = gamesListReducer(state, setIsFetchingGames(true))
    expect(newState.fetchingGames).toEqual(true)
})