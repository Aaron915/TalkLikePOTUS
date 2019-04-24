import { StyleSheet } from 'react-native'
import { secondary } from '../../../../../../../constants/colors'

export const twoWordsStyles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    selectedWords: {
        color: secondary
    }
})