import { horizontalCellPadding } from './../../RoundDetailConstants'
import { StyleSheet } from 'react-native'
import { black } from '../../../../../../constants/colors'
import { isAndroid } from '../../../../../../utils/deviceUtils'

const textContentFontSize = 16

let hideTextImageHeight = 73
if (isAndroid()) {
    hideTextImageHeight = 95
}

export const turnsDetailStyle = StyleSheet.create({
    sharedContainers: {
        marginVertical: 12,
        marginHorizontal: horizontalCellPadding,
        flexDirection: 'row'
    },
    contentContainers: {
        alignItems: 'stretch',
        marginLeft: 9,
        flex: 1
    },
    opponentContentNoText: {
        alignItems: 'stretch',
        marginTop: 7
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topBarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: black
    },
    hideTextImage: {
        height: hideTextImageHeight,
        width: undefined
    },
    playNowButton: {
        marginTop: 5
    },
    textContentStandard: {
        fontSize: textContentFontSize,
        color: black
    },
    textContentBolded: {
        fontSize: textContentFontSize,
        fontWeight: 'bold',
        color: black
    },
    waitingForOpponentText: {
        fontSize: 16,
        marginTop: 7
    },
    profilePicAndTrophyContainer: {
        alignItems: 'center'
    },
    trophy: {
        marginTop: 12
    }
})