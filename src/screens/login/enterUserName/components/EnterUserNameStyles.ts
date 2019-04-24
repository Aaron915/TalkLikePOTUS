import { StyleSheet } from 'react-native'
import { lightGreyTextColor } from '../../../../constants/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 23,
        justifyContent: 'space-between'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    trumpQuoteText: {
        color: lightGreyTextColor,
        fontSize: 18,
        textAlign: 'center',
        height: 105,
        width: 178,
        marginLeft: 22
    }
})