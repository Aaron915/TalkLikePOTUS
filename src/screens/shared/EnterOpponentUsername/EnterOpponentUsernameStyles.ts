import { darkBackground } from './../../../constants/colors'
import { StyleSheet } from 'react-native'

export const enterOpponentUsernameStyles = StyleSheet.create({
    main: {
        flex: 1
    },
    animatedBackground: {
        flex: 1
    },
    transparentBackground: {
        backgroundColor: darkBackground,
        justifyContent: 'center',
        flex: 1
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 14
    },
    contentContainerView: {
        paddingHorizontal: 35,
        paddingVertical: 23,
        height: 283,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    trumpIcon: {
        alignSelf: 'center'
    }
})