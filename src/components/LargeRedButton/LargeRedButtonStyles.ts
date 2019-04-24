import { secondary } from '../../constants/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    main: {
        height: 38,
        backgroundColor: secondary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})