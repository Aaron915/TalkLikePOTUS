import { getHasSeenPushNotificationPrompt, getHasSeenTutorialPrompt } from './../featurePromptSelectors'
import { hasSeenNotificationPrompt } from './../../actions/featurePromptActions'
import { FeaturePromptState } from './../../types/state'
import { State } from '../../types/state'

it('should be able to get whether the push notification prompt has been shown', () => {
    const state = {
        featurePrompt: {
            hasSeenNotificationPrompt: true
        }
    } as State

    expect(getHasSeenPushNotificationPrompt(state)).toEqual(true)
})

it('should be able to get whether the tutorial prompt has been shown', () => {
    const state = {
        featurePrompt: {
            hasSeenTutorialPrompt: true
        }
    } as State

    expect(getHasSeenTutorialPrompt(state)).toEqual(true)
})