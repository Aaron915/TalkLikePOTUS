import { createAction } from 'redux-actions'

export const setPushNotificationId = createAction('SET_PUSH_NOTIFICATION_ID', (token: string) => token)
export const clearPushNotificationId = createAction('REMOVE_NOTIFICATION_ID')
