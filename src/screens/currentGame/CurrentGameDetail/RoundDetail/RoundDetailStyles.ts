import { lightGreyColor } from './../../../../constants/colors'
import { StyleSheet } from 'react-native'

export const roundDetailStyles = StyleSheet.create({
    main: {
        flex: 1,
        width: 300,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: lightGreyColor
    },
    content: {
        paddingBottom: 20
    },
    seperator: {
        height: 12
    }
})