import { main, black, secondary } from './../../../../../../constants/colors'
import { StyleSheet } from 'react-native'

const contentBackgroundBorderRadius = 5
export const gameSummaryStyles = StyleSheet.create({
    main: {
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    mainGameSummary: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    userContaniner: {
        flex: 1,
        paddingRight: 5
    },
    opponentContainer: {
        flex: 1,
        paddingLeft: 5
    },
    userContentContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    opponentContentContainer: {
        justifyContent: 'flex-end'
    },
    lightText: {
        color: 'white'
    },
    readyToPlayBackground: {
        backgroundColor: main,
        borderRadius: contentBackgroundBorderRadius
    },
    userWonBackground: {
        backgroundColor: secondary,
        borderRadius: contentBackgroundBorderRadius
    },
    nameText: {
        color: black,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    declinedText: {
        color: black
    },
    readyToPlayText: {
        fontSize: 14,
        color: 'white',
        marginTop: 5
    }, imageContainerUser: {
        paddingRight: 5
    },
    imageContainerOpponent: {
        marginLeft: 5
    },
    opponentTextAndTrophyContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: 1
    },
    userTextAndTrophyContainer: {
        flex: 1
    },
    declineGame: {
        marginTop: 11,
        width: 157,
        alignSelf: 'center'
    },
    declineGameText: {
        fontSize: 15
    }
})

export const completedGameStyles = StyleSheet.create({
    main: {
        marginTop: 11
    },
    standardText: {
        color: black,
        fontSize: 16
    },
    boldedText: {
        fontWeight: 'bold'
    },
    topTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    playAgainContainer: {
        marginTop: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playAgainButtonContainer: {
        backgroundColor: main,
        borderRadius: 8
    },
    playAgainButton: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    playAgainText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})