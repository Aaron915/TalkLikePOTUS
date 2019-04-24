import { main } from '../../../constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: main,
        flex: 1
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center'
    },
    enterUserNameView: {
        marginHorizontal: 19,
        height: 299
    }
})