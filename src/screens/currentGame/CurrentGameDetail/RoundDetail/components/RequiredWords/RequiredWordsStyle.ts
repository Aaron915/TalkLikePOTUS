import { StyleSheet } from 'react-native'
import { black } from '../../../../../../constants/colors'

const word = {
    fontSize: 17,
    color: black
}

export const requiredWordsStyles = StyleSheet.create({
    main: {
        paddingVertical: 12,
        paddingHorizontal: 11,
        justifyContent: 'space-between'
    },
    requiredText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: black,
        marginBottom: 4
    },
    wordsContainer: {
        justifyContent: 'space-between'
    },
    word,
    wordTop: {
        ...word,
        marginBottom: 2
    }
})