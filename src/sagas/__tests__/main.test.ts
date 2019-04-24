import { fork } from 'redux-saga/effects'
import { rootSaga } from '../'
import { loginSaga } from '../login'
import { friendsSaga } from '../friendsSaga'
import { dataSaga } from '../dataSaga'
import { gameSagas } from '../currentGameSagas'
import { composeTurnSagas } from '../composeTurnSagas'
import { gamesListSaga } from '../gamesListSagas'
import { pushNotificationSaga } from '../pushNotificationSagas'

const mockRecord = jest.fn()
const mockLog = jest.fn()

jest.mock('react-native-firebase', () => {
    return {
        fabric: {
            crashlytics: () => {
                return {
                    recordError: () => {},
                    log: () => {}
                }
            }
        }
    }
})

it('should listen for all the the sub sagas', () => {
    const root = rootSaga()
    expect(root.next().value).toEqual(fork(pushNotificationSaga))
    expect(root.next().value).toEqual(fork(gamesListSaga))
    expect(root.next().value).toEqual(fork(composeTurnSagas))
    expect(root.next().value).toEqual(fork(gameSagas))
    expect(root.next().value).toEqual(fork(dataSaga))
    expect(root.next().value).toEqual(fork(loginSaga))
    expect(root.next().value).toEqual(fork(friendsSaga))
})