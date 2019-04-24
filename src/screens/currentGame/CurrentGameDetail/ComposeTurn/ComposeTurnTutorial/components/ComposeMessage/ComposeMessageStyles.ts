import { StyleSheet } from 'react-native'
import { black } from '../../../../../../../constants/colors'

const sharedMessageText = {
    fontSize: 16,
    color: black
}

export const composeMessageStyles = StyleSheet.create({
    messageText: {
        ...sharedMessageText
    },
    boldedMessageText: {
        ...sharedMessageText,
        fontWeight: 'bold'
    }
})