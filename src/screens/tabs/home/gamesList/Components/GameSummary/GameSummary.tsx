import React from 'react'
import {
    View, TouchableWithoutFeedback, Image, Text, TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { GameProps } from '../../../../../../selectors/gameSelectors'
import { getGameSummaryProps } from '../../../../../../selectors/gamesListSelectors'
import { State } from '../../../../../../types/state'
import { gameSummaryStyles, completedGameStyles } from './GameSummaryStyles'
import { standardStyles } from '../../../../../../styles/sharedStyles'
import Trophys from '../../../../../../components/Trophys/Trophys'
import BoldedText from '../../../../../../components/BoldedText/BoldedText'
import LargeRedButton from '../../../../../../components/LargeRedButton/LargeRedButton'
import Numeral from 'numeral'

export interface GameSummaryProps extends GameProps {
    _id: string,
    onPlayAgainTapped: (opponentId: string) => void,
    onDeclineGameTapped: (id: string) => void,
    onSummaryTapped: (id: string) => void,
    userName?: string,
    userProfilePicture?: string,
    userRoundsWon?: number,
    userCanPlay?: boolean,
    opponentName?: string,
    opponentFirstName?: string,
    opponentProfilePicture?: string,
    opponentRoundsWon?: number,
    opponentID?: string,
    waitingForOpponent?: boolean,
    canDeclineGame?: boolean,
    gameComplete?: GameSummaryCompletion,
    gameDeclined?: boolean,
    userForfeited?: boolean,
    opponentForfeited?: boolean
}

export interface GameSummaryCompletion {
    userWonGame: boolean,
    userTopTurnScore?: number,
    userTopTurnText?: string[],
    requiredWords?: string[]
}

class GameSummary extends React.Component<GameSummaryProps, any> {
    render() {
        return (
            <View style={[gameSummaryStyles.main, standardStyles.standardCell]}>
                <TouchableWithoutFeedback
                    onPress={this._onPress.bind(this)}>
                    <View>
                        {this._renderMainGameSummary()}
                        {this._renderCompletedGameInfo()}
                        {this._renderDeclineGame()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    _renderMainGameSummary() {
        return (
            <View style={gameSummaryStyles.mainGameSummary}>
                {this._renderUserSide()}
                {this._renderOpponent()}
            </View>
        )
    }

    _renderUserSide() {
        const userNameText = [gameSummaryStyles.nameText]
        const contenContainerStyle = [gameSummaryStyles.userContentContainer]

        if (this.props.gameComplete && this.props.gameComplete.userWonGame) {
            userNameText.push(gameSummaryStyles.lightText)
            contenContainerStyle.push(gameSummaryStyles.userWonBackground)
        }

        if (this.props.userCanPlay) {
            userNameText.push(gameSummaryStyles.lightText)
            contenContainerStyle.push(gameSummaryStyles.readyToPlayBackground)
        }
        return (
            <View style={gameSummaryStyles.userContaniner}>
                <View style={contenContainerStyle}>
                    <View style={gameSummaryStyles.imageContainerUser}>
                        {this._renderUserImage(this.props.userProfilePicture)}
                    </View>
                    <View style={gameSummaryStyles.userTextAndTrophyContainer}>
                        <Text style={userNameText}>{this.props.userName}</Text>
                        <Trophys numberOfTrophies={this.props.userRoundsWon} reversed={false} />
                        {
                            this.props.userCanPlay && <Text style={gameSummaryStyles.readyToPlayText}>Ready to play!</Text>
                        }
                        {
                            this.props.gameComplete && this.props.gameComplete.userWonGame &&
                            <Text
                                style={gameSummaryStyles.readyToPlayText}>You won!</Text>
                        }
                        {
                            this.props.userForfeited && <Text
                                style={[gameSummaryStyles.readyToPlayText, gameSummaryStyles.declinedText]}>Forfeited</Text>
                        }
                    </View>
                </View>
            </View>
        )
    }

    _renderOpponent() {
        const userNameText = [gameSummaryStyles.nameText]
        const contentContainerStyle = [gameSummaryStyles.userContentContainer, gameSummaryStyles.opponentContentContainer]

        if (this.props.gameComplete && !this.props.gameComplete.userWonGame) {
            userNameText.push(gameSummaryStyles.lightText)
            contentContainerStyle.push(gameSummaryStyles.userWonBackground)
        }

        if (this.props.waitingForOpponent) {
            userNameText.push(gameSummaryStyles.lightText)
            contentContainerStyle.push(gameSummaryStyles.readyToPlayBackground)
        }

        let bottomText
        let bottomTextStyle
        if (this.props.gameDeclined) {
            bottomText = `Declined`
            bottomTextStyle = [gameSummaryStyles.readyToPlayText, gameSummaryStyles.declinedText]
        } else if (this.props.opponentForfeited) {
            bottomText = 'Forfeited'
            bottomTextStyle = [gameSummaryStyles.readyToPlayText, gameSummaryStyles.declinedText]
        } else {
            bottomText = `Their Move`
            bottomTextStyle = gameSummaryStyles.readyToPlayText
        }

        return (
            <View style={gameSummaryStyles.opponentContainer}>
                <View style={contentContainerStyle}>
                    <View style={gameSummaryStyles.opponentTextAndTrophyContainer}>
                        <Text style={userNameText}>{this.props.opponentName}</Text>
                        <Trophys numberOfTrophies={this.props.opponentRoundsWon} reversed={true} />
                        {
                            (this.props.waitingForOpponent || this.props.gameDeclined || this.props.opponentForfeited)
                                && <Text style={bottomTextStyle}>{bottomText}</Text>
                        }
                        {
                            this.props.gameComplete && !this.props.gameComplete.userWonGame &&
                            <Text
                                style={gameSummaryStyles.readyToPlayText}>{`${this.props.opponentFirstName} Won`}</Text>
                        }
                    </View>
                    <View style={gameSummaryStyles.imageContainerOpponent}>
                        {this._renderUserImage(this.props.opponentProfilePicture)}
                    </View>
                </View>
            </View>
        )
    }

    _renderCompletedGameInfo() {
        if (this.props.gameComplete && this.props.gameComplete.userTopTurnScore && this.props.gameComplete.userTopTurnText) {
            const boldedText = [completedGameStyles.standardText, completedGameStyles.boldedText]
            return (
                <View style={completedGameStyles.main}>
                    <View>
                        <View style={completedGameStyles.topTextContainer}>
                            <Text style={boldedText}>Your Top Turn</Text>
                            <Text style={boldedText}>{Numeral(this.props.gameComplete.userTopTurnScore).format('0,0')}</Text>
                        </View>
                        <BoldedText
                        standardTextStyle={completedGameStyles.standardText}
                        boldedTextStyle={boldedText}
                        texts={this.props.gameComplete.userTopTurnText}
                        boldedPhrases={this.props.gameComplete.requiredWords}/>
                    </View>
                    <View style={completedGameStyles.playAgainContainer}>
                        <View style={completedGameStyles.playAgainButtonContainer}>
                            <TouchableOpacity
                            onPress={this._onPlayAgainPressed.bind(this)}
                            style={completedGameStyles.playAgainButton}>
                                <Text style={completedGameStyles.playAgainText}>Play Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        return undefined
    }

    _renderDeclineGame() {
        if (this.props.canDeclineGame) {
            return (
                <LargeRedButton
                    textStyle={gameSummaryStyles.declineGameText}
                    style={gameSummaryStyles.declineGame}
                    title={'Decline Game'}
                    enabled={true}
                    onPress={this._onDeclineGamePressed.bind(this)} />
            )
        }

        return undefined
    }

    _onDeclineGamePressed() {
        this.props.onDeclineGameTapped(this.props._id)
    }

    _renderUserImage(uri: string) {
        return (
            <Image style={standardStyles.standardSizedProfilePic} source={{ uri }} />
        )
    }

    _onPress() {
        if (!this.props.gameDeclined) {
            this.props.onSummaryTapped(this.props._id)
        }
    }

    _onPlayAgainPressed() {
        this.props.onPlayAgainTapped(this.props.opponentID)
    }
}

function mapStateToProps(state: State, ownProps: GameSummaryProps): Partial<GameSummaryProps> {
    return {
        ...getGameSummaryProps(state, ownProps)
    }
}

export default connect(mapStateToProps)(GameSummary)