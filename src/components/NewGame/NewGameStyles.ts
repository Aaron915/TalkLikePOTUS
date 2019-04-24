import { StyleSheet } from 'react-native'
import { black } from '../../constants/colors'
export const newGameStyles = StyleSheet.create({
    mainContainer: {
        height: 100,
        paddingVertical: 9,
        alignItems: 'stretch'
    },
    newGameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    }
})