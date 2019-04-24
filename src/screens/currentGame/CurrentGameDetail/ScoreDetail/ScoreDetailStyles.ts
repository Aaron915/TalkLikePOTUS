import { darkBackground } from './../../../../constants/colors'
import { StyleSheet } from 'react-native'

export const scoreDetailStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: darkBackground
    },
    button: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 107
    },
    contentView: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    potusBot: {
        marginBottom: 16
    }
})