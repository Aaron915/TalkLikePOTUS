import React from 'react'
import {
    View,
    Image,
    Text
} from 'react-native'
import { standardStyles } from '../../../../../../styles/sharedStyles'
import { turnsDetailStyle } from './TurnsDetailStyles'
import Images from '../../../../../../shared/Images'
import LargeRedButton from '../../../../../../components/LargeRedButton/LargeRedButton'
import BoldedText from '../../../../../../components/BoldedText/BoldedText'
import Numeral from 'numeral'

export interface TurnsDetailProps {
    userProfilePicture?: string,
    userFullName?: string,
    userScore?: number,
    userWonRound?: boolean,
    userCanPlay?: boolean,
    userText?: string[],
    opponentProfilePicture?: string,
    opponentFullName?: string,
    opponentText?: string[],
    opponentScore?: number,
    opponentWonRound?: boolean,
    hideOpponentText?: boolean,
    waitingForOpponent?: string,
    roundRequiredWords?: string[],
    onPlayNowSelected?: () => void
}

export default class TurnsDetail extends React.Component<TurnsDetailProps, any> {
    render() {
        return (
            <View style={standardStyles.standardCell}>
                {this._renderOpponent()}
                <View style={standardStyles.horizintalSeperatorThin} />
                {this._renderUser()}
            </View>
        )
    }

    _renderOpponent() {
        const opponentScoreText = this.props.hideOpponentText ? undefined : this.props.opponentScore
        return (
            <View style={turnsDetailStyle.sharedContainers}>
                {this._renderUserProfileAndTrophy(this.props.opponentProfilePicture, this.props.opponentWonRound)}
                <View style={turnsDetailStyle.contentContainers} >
                    {this._renderTopBar(this.props.opponentFullName, opponentScoreText)}
                    {this._renderOpponentContent()}
                    {this._renderWaitingForOpponent()}
                </View>
            </View>
        )
    }

    _renderOpponentContent() {
        if (this.props.hideOpponentText) {
            return (
                <View style={turnsDetailStyle.opponentContentNoText}>
                    <Image style={turnsDetailStyle.hideTextImage} resizeMode={'cover'} source={Images.hiddenTextCover} />
                </View>
            )
        } else if (this.props.opponentText) {
            return this._renderTextContent(this.props.opponentText)
        }

        return undefined
    }

    _renderWaitingForOpponent() {
        if (this.props.waitingForOpponent) {
            return (
                <Text style={turnsDetailStyle.waitingForOpponentText}>{this.props.waitingForOpponent}</Text>
            )
        }

        return undefined
    }

    _renderUser() {
        return (
            <View style={turnsDetailStyle.sharedContainers}>
                {this._renderUserProfileAndTrophy(this.props.userProfilePicture, this.props.userWonRound)}
                <View style={turnsDetailStyle.contentContainers} >
                    {this._renderTopBar(this.props.userFullName, this.props.userScore)}
                    {this._renderUserContent()}
                </View>
            </View>
        )
    }

    _renderUserContent() {
        if (this.props.userCanPlay) {
            return (
                <LargeRedButton
                    style={turnsDetailStyle.playNowButton}
                    title={'Play Now'}
                    onPress={this.props.onPlayNowSelected}
                    enabled={true} />
            )
        } else {
            return this._renderTextContent(this.props.userText)
        }
    }

    _renderUserProfileAndTrophy(profileURL: string, showTrophy: boolean) {
        return (
            <View style={turnsDetailStyle.profilePicAndTrophyContainer}>
                <Image style={standardStyles.standardSizedProfilePic} source={{ uri: profileURL }} />
                {showTrophy && <Image style={turnsDetailStyle.trophy} source={Images.trophy} />}
            </View>
        )
    }

    _renderTopBar(name: string, score?: number) {
        return (
            <View style={turnsDetailStyle.topBarContainer}>
                <Text style={turnsDetailStyle.topBarText}>{name}</Text>
                <Text style={turnsDetailStyle.topBarText}>{score && Numeral(score).format('0,0')}</Text>
            </View>
        )
    }

    _renderTextContent(texts?: string[]) {
        if (texts) {
            return (
                <BoldedText
                    standardTextStyle={turnsDetailStyle.textContentStandard}
                    boldedTextStyle={turnsDetailStyle.textContentBolded}
                    texts={texts}
                    boldedPhrases={this.props.roundRequiredWords} />
            )
        }

        return undefined
    }
}