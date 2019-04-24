import { StyleSheet } from 'react-native'
import { black } from '../../../../../constants/colors'
export const friendCellStyles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        padding: 9,
        height: 56,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: black,
        marginLeft: 9
    },
    image: {
        width: 38,
        height: 38,
        borderRadius: 19
    }
})