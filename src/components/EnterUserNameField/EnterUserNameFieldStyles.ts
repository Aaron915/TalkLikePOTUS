import { black, secondary } from './../../constants/colors'
import { StyleSheet } from 'react-native'
import { isAndroid } from '../../utils/deviceUtils'

let textHeight = 31
if (isAndroid()) {
    textHeight = 60
}

export const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        color: black,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        borderBottomColor: secondary,
        height: textHeight,
        marginBottom: 5
    },
    errorText: {
        fontSize: 15,
        color: secondary
    }
})