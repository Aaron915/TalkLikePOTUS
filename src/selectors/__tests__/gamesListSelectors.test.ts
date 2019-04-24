import { gamesListStyles } from './../../screens/tabs/home/gamesList/GamesListStyles'
import { gameOverviewStyles } from './../../screens/currentGame/CurrentGameDetail/RoundDetail/components/GameOverView/GameOverviewStyles'
import { State } from './../../types/state'
import { NextPageParams } from './../../types/gamesList'
import { getAtEndOfGames, getNextPageParams, getOpenGames, getCompletedGames, getHasNextGameParams, getGameSummaryProps} from './../gamesListSelectors'
import { loadJSON } from '../../mockData/loadJSON'
import { GameProps } from '../gameSelectors'

it('should be able to get the AtEnd indicator', () => {
    const state = {
        gamesList: {
            atEndOfGames: true
        }
    } as State
    expect(getAtEndOfGames(state)).toBeTruthy()
})

it('should be able to get the next page parameters', () => {
    const nextPageParams: NextPageParams = {
        updatedAt: 123444,
        pageLimit: 20,
        pageNumber: 2
    }
    const state = {
        gamesList: {
            nextPageParams
        }
    } as State

    expect(getNextPageParams(state)).toEqual(nextPageParams)
    expect(getHasNextGameParams(state)).toEqual(true)
})

it('should be able to sort games into opened or closed', () => {
    // TODO: use a response that has closed games
    const gamesList = loadJSON('games_list_response').response.games
    const completedGame = loadJSON('complete_game')

    const state = {
        data: {
            games: gamesList,
            user: {
                _id: '5a41c8e023c67aacdb337799'
            }
        }
    } as State

    const openGames = getOpenGames(state)
    const closedGames = getCompletedGames(state)
    expect(closedGames.length).toEqual(0)
    expect(openGames.length).toEqual(20)
    expect(openGames[0]).toEqual(gamesList[0])
    expect(openGames[openGames.length - 1]).toEqual(gamesList[openGames.length - 1])
})

it('should be able to extract completed games when there are some.', () => {
    const gamesList = loadJSON('games_list_response_with_completed').response.games
    const state = {
        data: {
            games: gamesList,
            user: {
                _id: '5a5d515796c17c0014e558e8'
            }
        }
    } as State
    const openGames = getOpenGames(state)
    const closedGames = getCompletedGames(state)
    expect(closedGames.length).toEqual(1)
    expect(openGames.length).toEqual(6)
})

it('should be able to get all of the properties for a single game', () => {
    const game = loadJSON('submitTurnResponse').response.game
    const user = loadJSON('user_2')
    const state = {
        data: {
            games: [game],
            user
        }
    }
    const props: GameProps = {
        _id: '5a41c8e023c67aacdb337799'
    }

    const gameSummaryProps = getGameSummaryProps(state, props)
    expect(gameSummaryProps.userName).toEqual('Susan')
    expect(gameSummaryProps.userProfilePicture).toEqual('https://graph.facebook.com/100985950686286/picture?type=large')
    expect(gameSummaryProps.userRoundsWon).toEqual(0)
    expect(gameSummaryProps.userCanPlay).toEqual(false)
    expect(gameSummaryProps.opponentName).toEqual('John')
    expect(gameSummaryProps.opponentFirstName).toEqual('John')
    expect(gameSummaryProps.opponentProfilePicture).toEqual('https://graph.facebook.com/120937442026979/picture?type=large')
    expect(gameSummaryProps.opponentRoundsWon).toEqual(0)
    expect(gameSummaryProps.waitingForOpponent).toEqual(true)
    expect(gameSummaryProps.canDeclineGame).toEqual(false)
    expect(gameSummaryProps.opponentID).toEqual('5a2c7a647ae8fb3758b74783')
    expect(gameSummaryProps.gameComplete).toBeUndefined()
    expect(gameSummaryProps.gameDeclined).toBe(false)
})

it('should have all the right properties for a defined game', () => {
    const game = loadJSON('declined_game')
    const user = loadJSON('user_2')
    const state = {
        data: {
            games: [game],
            user
        }
    }

    const props: GameProps = {
        _id: '5a7d085859a7ff001afb67d1'
    }
    const gameSummaryProps = getGameSummaryProps(state, props)
    expect(gameSummaryProps.gameComplete).toBeUndefined()
})