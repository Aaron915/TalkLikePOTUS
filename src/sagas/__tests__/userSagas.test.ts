import { setUser } from './../../actions/dataActions'
import { getUser } from './../../selectors/dataSelectors'
import { select, call, put } from 'redux-saga/effects'
import { User } from './../../types/models'
import { updateUser } from '../userSagas'
import { loadJSON } from '../../mockData/loadJSON'
import { putAPI } from '../api'
describe('updating the user', () => {
    it('should update the user correctly based on the new props', () => {
        const newProps: Partial<User> = {
            pushNotificationId: 'test1234',
            username: 'test1234'
        }
        const user = loadJSON('user_2')

        const saga = updateUser(newProps)
        const expectedValue = {
            ...user,
            ...newProps
        }
        const response = {
            response: {
                user: expectedValue
            }
        }
        expect(saga.next().value).toEqual(select(getUser))
        expect(saga.next(user).value).toEqual(call(putAPI, 'user/update', {user: expectedValue}))
        expect(saga.next(response).value).toEqual(put(setUser(response.response.user)))
    })

    it('should remove properties that are undefined in the passed in props', () => {
        const newProps: Partial<User> = {
            pushNotificationId: undefined
        }
        const user = loadJSON('user_2')
        const saga = updateUser(newProps)
        saga.next()
        expect(saga.next(user).value).toEqual(call(putAPI, 'user/update', { user: {...user, pushNotificationId: undefined}}))
    })
})