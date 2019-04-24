import { main } from './../../../constants/colors'
import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    mainView: {
        backgroundColor: main,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    centerContainer: {
        justifyContent: 'space-between',
        width: 271,
        height: 466,
        alignItems: 'center'
    },
    quoteText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})