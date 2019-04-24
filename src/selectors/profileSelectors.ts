import { getUserProfilePicture, getUserUserName, getUserFullName, getUserHasPushNotificationId } from './dataSelectors'
import { State } from './../types/state'
import { ProfileProps } from './../screens/tabs/profile/Profile/Profile'
import { createStructuredSelector } from 'reselect'

export const getProfileProps: (state: State) => Partial<ProfileProps> = createStructuredSelector({
    profilePicURL: getUserProfilePicture,
    userFullName: getUserFullName,
    username: getUserUserName,
    pushNotifcationsEnabled: getUserHasPushNotificationId
})