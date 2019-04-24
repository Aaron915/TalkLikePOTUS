import { horizontalCellPadding } from './../../RoundDetailConstants'
import { StyleSheet } from 'react-native'
import { black } from '../../../../../../constants/colors'

export const gameOverviewStyles = StyleSheet.create({
    main: {
        paddingVertical: 7,
        paddingHorizontal: horizontalCellPadding
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    userContainer: {
        flexDirection: 'row',
        paddingRight: 5
    },
    opponentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 5
    },
    contentSeperator: {
        width: 5
    },
    rightContainer: {
        alignItems: 'flex-end',
        flex: 1
    },
    trophysContainer: {
        flexDirection: 'row'
    },
    trophy: {
        marginRight: 8
    },
    trophyReversed: {
        marginLeft: 8
    },
    nameText: {
        fontSize: 20,
        color: black,
        fontWeight: 'bold',
        marginBottom: 8
    }
})