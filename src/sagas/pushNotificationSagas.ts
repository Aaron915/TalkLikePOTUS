import { User } from './../types/models'
import { setPushNotificationId, clearPushNotificationId } from './../actions/pushNotificationActions'
import { takeLatest, select, call } from 'redux-saga/effects'
import { getUserPushNotificationId } from '../selectors/dataSelectors'
import { updateUser } from './userSagas'
import { platformForBackend } from '../utils/deviceUtils'

export function* updatePushNotificationID(action) {
    const pnId = action.payload
    const currentPnId = yield select(getUserPushNotificationId)

    if (pnId !== currentPnId) {
        const platform = yield call(platformForBackend)

        let newUserProps: Partial<User>
        if (pnId) {
            newUserProps = {
                pushNotificationId: pnId,
                platform
            }
        } else {
            newUserProps = {
                pushNotificationId: undefined,
                platform: undefined
            }
        }

        yield call(updateUser, newUserProps)
    }
}

export function* pushNotificationSaga() {
    yield takeLatest(setPushNotificationId.toString(), updatePushNotificationID)
    yield takeLatest(clearPushNotificationId.toString(), updatePushNotificationID)
}