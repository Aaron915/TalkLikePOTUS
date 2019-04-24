import React from 'react'
import {
    ScrollView,
    View,
    Modal,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import RoundHeader from './components/RoundHeader/RoundHeader'
import RequiredWords from './components/RequiredWords/RequiredWords'
import ForfeitButton from './components/ForfeitButton/ForfeitButton'
import { roundDetailStyles } from './RoundDetailStyles'
import { getRoundDetailProps } from './RoundDetailSelectors'
import GameOverview from './components/GameOverView/GameOverview'
import TurnsDetail, { TurnsDetailProps } from './components/TurnsDetail/TurnsDetail'
import { RoundInterfaceProps } from '../../../../selectors/roundSelectors'
import ComposeTurn from '../ComposeTurn/ComposeTurn'
import { alertWithActionAndCancel } from '../../../../utils/shared/Alerts'
import { forfeitUser, forfeitOpponent } from '../../../../actions/currentGameActions'

export interface RoundDetailProps extends RoundInterfaceProps {
    gameAvailable?: boolean
    width: number
    roundNumber: number,
    header?: RoundDetailHeader,
    requiredWords: RoundDetailRequiredWords,
    gameOverview: RoundDetailGameOverview,
    turnsDetail?: TurnsDetailProps,
    forfeitButton: ForfeitButtonProps,
    navigation: any,
    showForfeit: boolean
    onLeftButtonPressed: (idx: number) => void,
    onRightButtonPressed: (idx: number) => void,
    forfeitUser?: () => void,
    forfeitOpponent?: () => void
}

export interface RoundDetailHeader {
    showLeftArrow: boolean,
    showRightArrow: boolean,
    roundNumber: number
}

export interface RoundDetailRequiredWords {
    firstWord?: string,
    secondWord?: string
}

export interface RoundDetailGameOverview {
    userProfilePicture?: string,
    userFirstName?: string,
    userRoundsWon?: number,
    opponentProfilePicture?: string,
    opponentFirstName?: string,
    opponentRoundsWon?: number
}

export interface ForfeitButtonProps {
    forfeitUser: boolean,
    opponentName: string
    onPress?: () => void
}

interface RoundDetailState {
    showComposeTurn: boolean
}

class RoundDetail extends React.Component<RoundDetailProps, RoundDetailState> {

    constructor(props) {
        super(props)
        this.state = {
            showComposeTurn: false
        }
    }

    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={roundDetailStyles.content}
                style={[roundDetailStyles.main, { width: this.props.width }]}>
                {
                    !this.props.gameAvailable && <ActivityIndicator animating={!this.props.gameAvailable} />
                }
                {this._renderHeader()}
                {this._renderSeperator()}
                {this._renderGameOverview()}
                {this._renderSeperator()}
                {this._renderRequiredWords()}
                {this._renderSeperator()}
                {this._renderTurnsDetail()}
                {this._renderSeperator()}
                {this._renderForfeitGame()}
                {this._renderComposeTurnModal()}
            </ScrollView>
        )
    }

    _renderHeader() {
        return (
            <RoundHeader
                showLeft={this.props.header.showLeftArrow}
                showRight={this.props.header.showRightArrow}
                roundNumber={this.props.header.roundNumber}
                onLeftPress={this._leftButtonPressed.bind(this)}
                onRightPress={this._rightButtonPressed.bind(this)} />
        )
    }

    _renderSeperator() {
        return (<View style={roundDetailStyles.seperator} />)
    }

    _renderGameOverview() {
        return (
            <GameOverview
                userName={this.props.gameOverview.userFirstName}
                userPorfilePicture={this.props.gameOverview.userProfilePicture}
                userRoundsWon={this.props.gameOverview.userRoundsWon}
                opponentName={this.props.gameOverview.opponentFirstName}
                opponentProfilePicture={this.props.gameOverview.opponentProfilePicture}
                opponentRoundsWon={this.props.gameOverview.opponentRoundsWon} />
        )
    }

    _renderRequiredWords() {
        return (
            <RequiredWords
                firstWord={this.props.requiredWords.firstWord}
                secondWord={this.props.requiredWords.secondWord} />
        )
    }

    _renderTurnsDetail() {
        return (
            <TurnsDetail {...this.props.turnsDetail}
                onPlayNowSelected={this._showComposeTurn.bind(this)} />
        )
    }

    _renderForfeitGame() {
        if (this.props.showForfeit) {
            return (
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <ForfeitButton
                        onPress={this._onForfeitPressed.bind(this)}
                        opponentName={this.props.forfeitButton.opponentName}
                        forfeitUser={this.props.forfeitButton.forfeitUser} />
                </View>
            )
        }

        return undefined
    }

    _renderComposeTurnModal() {
        return (
            <Modal
                visible={this.state.showComposeTurn}
                animationType={'slide'}>
                <ComposeTurn
                    onShowDetailDismiss={this._hideComposeTurn.bind(this)}
                    roundNumber={this.props.roundNumber}
                    cancelPressed={this._hideComposeTurn.bind(this)} />
            </Modal>
        )
    }

    _showComposeTurn() {
        this.setState({
            showComposeTurn: true
        })
    }

    _hideComposeTurn() {
        this.setState({
            showComposeTurn: false
        })
    }

    _leftButtonPressed() {
        this.props.onLeftButtonPressed(this.props.roundNumber - 1)
    }

    _rightButtonPressed() {
        this.props.onRightButtonPressed(this.props.roundNumber - 1)
    }

    _onForfeitPressed() {
        let title
        let message
        let action
        if (this.props.forfeitButton.forfeitUser) {
            title = 'Forfeit'
            message = 'Are you sure you want to forfeit this game? This will end the game with your opponent being the winner.'
            action = this.props.forfeitUser
        } else {
            title = ` Force Forfeit ${this.props.forfeitButton.opponentName}`
            message = 'Are you sure you want to force forfeit your opponent? This will end the game with you being the winner.'
            action = this.props.forfeitOpponent
        }

        alertWithActionAndCancel(title, message, 'Yes', () => {
            action()
            this.props.navigation.goBack()
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        forfeitUser: () => {dispatch(forfeitUser())},
        forfeitOpponent: () => {dispatch(forfeitOpponent())}
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...getRoundDetailProps(state, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundDetail)
