import { fetchGames } from './../actions/gamesListActions'
import { loadStartData } from './../actions/dataActions'
import { getNextFriends } from './../actions/friendsActions'
import { put, takeLatest } from 'redux-saga/effects'
// Represents tasks that should be completed upon login to fetch user all data.
export function * appStart() {
    yield put(getNextFriends())
    yield put(fetchGames(true))
}

export function * dataSaga() {
    yield takeLatest(loadStartData, appStart)
}
