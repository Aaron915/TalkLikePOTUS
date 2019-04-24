import { fork } from 'redux-saga/effects'
import { loginSaga } from '../sagas/login'
import { friendsSaga } from '../sagas/friendsSaga'
import { dataSaga } from './dataSaga'
import { gameSagas } from './currentGameSagas'
import { composeTurnSagas } from './composeTurnSagas'
import { gamesListSaga } from './gamesListSagas'
import { pushNotificationSaga } from './pushNotificationSagas'

export function * rootSaga() {
    yield fork(pushNotificationSaga)
    yield fork(gamesListSaga)
    yield fork(composeTurnSagas)
    yield fork(gameSagas)
    yield fork(dataSaga)
    yield fork(loginSaga)
    yield fork(friendsSaga)
}