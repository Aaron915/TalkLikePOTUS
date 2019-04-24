import { black } from './../../../../constants/colors'
import { StyleSheet } from 'react-native'
import { circleStyle } from '../../../../styles/styleUtils'

export const profileStyles = StyleSheet.create({
     main: {
         paddingHorizontal: 12,
         paddingTop: 12
     },
     image: {
         ...circleStyle(50),
         marginRight: 10
     },
     cell: {
        padding: 10,
        flexDirection: 'row'
     },
     switchContainer: {
         marginLeft: 10,
         justifyContent: 'center'
     },
     boldedText: {
         color: black,
         fontWeight: 'bold',
         fontSize: 20
     },
     textContainers: {
         justifyContent: 'space-between'
     },
     usernameText: {
         color: black,
         fontSize: 20
     },
     pushNotificationMessageText: {
         color: black,
         fontSize: 14,
         marginTop: 5
     },
     pushNotificationsCell: {
         justifyContent: 'space-between'
     }
})