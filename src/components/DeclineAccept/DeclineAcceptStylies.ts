import { main, secondary } from './../../constants/colors'
import { StyleSheet } from 'react-native'

export const declineAcceptStyles = StyleSheet.create({
    main: {
        flexDirection: 'row'
    },
    buttonContainers: {
       flex: 1
    },
    declineSide: {
        marginRight: 5
    },
    buttons: {
        paddingVertical: 12,
        alignItems: 'center'
    },
    sharedText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    declineText: {
        color: secondary
    },
    acceptText: {
        color: main
    }
})