import { hasSeenNotificationPrompt, hasSeenTutorialPrompt } from './../actions/featurePromptActions'
import { handleActions } from 'redux-actions'
import { FeaturePromptState } from '../types/state'

const initialState: FeaturePromptState = {
    hasSeenNotificationPrompt: false,
    hasSeenTutorialPrompt: false
}

export default handleActions({
    [hasSeenNotificationPrompt](state: FeaturePromptState, _action: any): FeaturePromptState {
        return {...state, hasSeenNotificationPrompt: true}
    },
    [hasSeenTutorialPrompt](state: FeaturePromptState, _action: any): FeaturePromptState {
        return {...state, hasSeenTutorialPrompt: true}
    }
}, initialState)