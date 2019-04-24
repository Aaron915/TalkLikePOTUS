import { StyleSheet } from 'react-native'
import { darkBackground } from '../../../../../constants/colors'

export const composeTurnTutorialStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: darkBackground
    },
    keyboardAvoidingView: {
        flex: 1
    },
    tutorialContainers: {
        flex: 1
    },
    scrollView: {
        flex: 1
    }
})