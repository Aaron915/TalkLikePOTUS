import { StyleSheet } from 'react-native'
import { main } from '../../constants/colors'
import { isIPhoneX } from '../../utils/deviceUtils'

const seperatorSize = isIPhoneX() ? 40 : 20
export const mainTabContainerStyles = StyleSheet.create({
    main: {
        flex: 1
    },
    adSeperator: {
        height: seperatorSize,
        backgroundColor: main
    },
    adContainer: {
        alignItems: 'center',
        backgroundColor: main
    },
    ad: {
        backgroundColor: main
    }
})