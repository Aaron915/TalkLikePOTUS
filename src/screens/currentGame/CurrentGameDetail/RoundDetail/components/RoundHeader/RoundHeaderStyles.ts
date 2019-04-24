import { lightGreyColor, black } from './../../../../../../constants/colors'
import { StyleSheet } from 'react-native'

export const headerStyles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        backgroundColor: lightGreyColor,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftArrowButton: {
        justifyContent: 'flex-start'
    },
    rightArrowButton: {
        justifyContent: 'flex-end'
    },
    // Shared attributes for the arrows.
    bothArrowButtons: {
        alignItems: 'center',
        backgroundColor: lightGreyColor,
        width: 40,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black
    }
})