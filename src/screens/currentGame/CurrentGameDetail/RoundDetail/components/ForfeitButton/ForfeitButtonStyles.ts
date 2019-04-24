import { black } from './../../../../../../constants/colors'
import { StyleSheet } from 'react-native'

export const forfeitButtonStyles = StyleSheet.create({
     button: {
         alignItems: 'center',
         justifyContent: 'center',
         paddingVertical: 12
     },
     text: {
        fontSize: 17,
        color: black,
        fontWeight: 'bold'
     }
})