import { black } from './../../../../../../constants/colors'
import { StyleSheet } from 'react-native'
import { darkBackground } from '../../../../../../constants/colors'

export const pushNotificationPromptStyles = StyleSheet.create({
    main: {
        backgroundColor: darkBackground,
        flex: 1,
        alignItems: 'center'
    },
    subContainers: {
        flex: 1,
        justifyContent: 'flex-end',
        width: 351
    },
    contentContainer: {
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginBottom: 12,
        alignItems: 'center'
    },
    wantPushNotificationText: {
        color: black,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    messageText: {
        color: black,
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center'
    }
})