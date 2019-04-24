import { State } from './../types/state'

export const getHasSeenPushNotificationPrompt: (state: State) => boolean
    = (state) => { return state.featurePrompt.hasSeenNotificationPrompt }

export const getHasSeenTutorialPrompt: (state: State) => boolean
    = (state) => { return state.featurePrompt.hasSeenTutorialPrompt }