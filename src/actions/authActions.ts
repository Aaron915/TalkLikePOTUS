import { createAction } from 'redux-actions'

export const setBearerToken = createAction('SET_BEARER_TOKEN', (token: string) => token)