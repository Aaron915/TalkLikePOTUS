import { createAction } from 'redux-actions'

export const setText = createAction('SET_TEXT', (text: string) => text)
export const submitText = createAction('SUBMIT_TEXT')
export const setConnectedToInternet = createAction('SET_CONNECTED_TO_INTERNET', (connected: boolean) => connected)
export const setScore = createAction('SET_SCORE', (score: number) => score)
export const setSubmitScoreError = createAction('SET_SUBMIT_SCORE_ERROR', error => error)
export const resetComposeTurnState = createAction('RESET_COMPOSE_TURN_STATE')