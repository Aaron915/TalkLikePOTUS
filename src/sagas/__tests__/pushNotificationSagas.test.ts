import { setPushNotificationId, clearPushNotificationId } from './../../actions/pushNotificationActions'
import { takeLatest, select, call } from 'redux-saga/effects'
import { pushNotificationSaga, updatePushNotificationID} from '../pushNotificationSagas'
import { getUserPushNotificationId } from '../../selectors/dataSelectors'
import { updateUser } from '../userSagas'
import { platformForBackend } from '../../utils/deviceUtils'
describe('updating push notification id', () => {
    it('should update the push notification id if it is different than the previous id', () => {
        const payloadID = 'test1234'
        const platform = 'ios'
        const saga = updatePushNotificationID(setPushNotificationId(payloadID))
        expect(saga.next().value).toEqual(select(getUserPushNotificationId))
        expect(saga.next('notequal').value).toEqual(call(platformForBackend))
        expect(saga.next(platform).value).toEqual(call(updateUser, {pushNotificationId: payloadID, platform}))
        expect(saga.next().value).toBeUndefined()
    })

    it('should not update the push notification id if its the same as the existing', () => {
        const payloadID = 'test1234'
        const saga = updatePushNotificationID(setPushNotificationId(payloadID))
        expect(saga.next().value).toEqual(select(getUserPushNotificationId))
        expect(saga.next(payloadID).value).toBeUndefined()
        expect(saga.next().value).toBeUndefined()
    })
})

describe('clearing the notification ID', () => {
    it('should post an empty body for clearing', () => {
        const action = clearPushNotificationId()
        const saga = updatePushNotificationID(action)
        saga.next('fake pn')
        saga.next('iOS')
        expect(saga.next().value).toEqual(call(updateUser, {}))
    })
})

describe('listening to actions', () => {
    it('should listen to all of the proper actions', () => {
        const saga = pushNotificationSaga()
        expect(saga.next().value).toEqual(takeLatest(setPushNotificationId.toString(), updatePushNotificationID))
        expect(saga.next().value).toEqual(takeLatest(clearPushNotificationId.toString(), updatePushNotificationID))
        expect(saga.next().value).toEqual(undefined)
    })
})