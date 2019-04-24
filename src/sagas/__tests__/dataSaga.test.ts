import { put, takeLatest } from 'redux-saga/effects'
import { appStart, dataSaga } from '../dataSaga'
import { getNextFriends } from '../../actions/friendsActions'
import { loadStartData } from '../../actions/dataActions'
import { fetchGames } from '../../actions/gamesListActions'

it('should perform all needed operations on app launch', () => {
    const appStartSaga = appStart()
    expect(appStartSaga.next().value).toEqual(put(getNextFriends()))
    expect(appStartSaga.next().value).toEqual(put(fetchGames(true)))
    expect(appStartSaga.next().value).toBeUndefined()
})

it('should listen for when app data needs to be fetched', () => {
    const data = dataSaga()
    expect(data.next().value).toEqual(takeLatest(loadStartData, appStart))
})