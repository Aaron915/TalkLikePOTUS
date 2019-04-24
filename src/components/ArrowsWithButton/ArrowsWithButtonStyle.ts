import { main } from './../../constants/colors'
import { StyleSheet } from 'react-native'

export const arrowsWithButtonStyles = StyleSheet.create({
     main: {
        flexDirection: 'row'
     },
     containers: {
         flex: 1
     },
     leftContainer: {
         flexDirection: 'row'
     },
     centerContainer: {
         flexDirection: 'row',
         justifyContent: 'center'
     },
     rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
     },
     centerButtonText: {
         fontSize: 20,
         fontWeight: 'bold',
         color: 'white'
     },
     centerButton: {
        borderRadius: 4,
        paddingHorizontal: 20,
        backgroundColor: main,
        alignItems: 'center',
        justifyContent: 'center'
     }
})