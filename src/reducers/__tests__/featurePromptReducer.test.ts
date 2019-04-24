import { hasSeenNotificationPrompt, hasSeenTutorialPrompt } from './../../actions/featurePromptActions'
import { FeaturePromptState } from './../../types/state'
import featurePromptReducer from '../featurePromptReducer'

it('should be able to set that the notification feature prompt has been viewed', () => {
    const state: FeaturePromptState = {
        hasSeenNotificationPrompt: false,
        hasSeenTutorialPrompt: false
    }
    expect(featurePromptReducer(state, hasSeenNotificationPrompt()).hasSeenNotificationPrompt).toBeTruthy()
})

it('should be able to set that the tutorial prompt has been viewed', () => {
    const state: FeaturePromptState = {
        hasSeenNotificationPrompt: false,
        hasSeenTutorialPrompt: false
    }
    expect(featurePromptReducer(state, hasSeenTutorialPrompt()).hasSeenTutorialPrompt).toBeTruthy()
})