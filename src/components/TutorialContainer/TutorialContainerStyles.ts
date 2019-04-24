import { black } from './../../constants/colors'
import { StyleSheet } from 'react-native'

export const tutorialContainerStyles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
     contentContainer: {
         height: 240,
         width: 351,
         alignItems: 'stretch',
         justifyContent: 'space-between',
         padding: 13
     },
     text: {
         fontSize: 20,
         fontWeight: 'bold',
         color: black,
         textAlign: 'center'
     }
})