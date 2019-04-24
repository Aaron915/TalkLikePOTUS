import React from 'react'
import {
    View, TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { ScoreDetailProps } from './ScoreDetail'
import { RoundInterfaceProps } from './../../../../selectors/roundSelectors'
import { scoreDetailStyles } from './ScoreDetailStyles'
import PotusBot from './components/PotusBot/PotusBot'
import ScoreProgress from './components/ScoreProgress/ScoreProgress'
import { State } from '../../../../types/state'
import { getScoreDetailsProps } from '../../../../selectors/componentSelectors/scoreDetailSelectors'

export interface ScoreDetailProps extends RoundInterfaceProps {
    userScorePercent?: number,
    opponentScorePercent?: number,
    opponentProfilePicture?: string,
    userWon?: boolean,
    userScoreFormatted?: string,
    userProfilePicture?: string,
    onAnimationsFinished(): void,
    onOutsideContentPress(): void
}

const textFadeDuration = 1000

interface ScoreDetailState {
    // Starts the animation for hiding message text.
    hideMessageText: boolean,
    // Starts the animation for moving the user icon.
    moveUserIcon: boolean,
    // Starts the animation for showing all text after other animations.
    showAllText: boolean,
}

class ScoreDetail extends React.Component<ScoreDetailProps, ScoreDetailState> {
    constructor(props) {
        super(props)
        this.state = {
            hideMessageText: false,
            moveUserIcon: false,
            showAllText: false
        }
    }
    render() {
        return (
            <View style={scoreDetailStyles.main}>
                <TouchableWithoutFeedback style={scoreDetailStyles.button} onPress={this.props.onOutsideContentPress}>
                    <View style={scoreDetailStyles.contentContainer}>
                        {this._renderContent()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    componentWillReceiveProps(nextProps: ScoreDetailProps) {
        if (!this.props.userScorePercent && nextProps.userScorePercent) {
            this.setState({
                hideMessageText: true
            })
        }
    }

    _renderContent() {
        return (
            <View style={scoreDetailStyles.contentView}>
                <PotusBot style={scoreDetailStyles.potusBot}
                    hideMessageText={this.state.hideMessageText}
                    onHideMessageComplete={this._hideMessageAnimationComplete.bind(this)}
                    onShowAllTextComplete={this._showAllTextAnimationComplete.bind(this)}
                    showAllText={this.state.showAllText}
                    userWon={this.props.userWon}
                    transistionAnimationLength={1000}
                    textFadeDuration={textFadeDuration}
                    userScore={this.props.userScoreFormatted} />
                <ScoreProgress
                    animateUserScore={this.state.moveUserIcon}
                    onUserScoreAnimationComplete={this._onAnimateUserIconComplete.bind(this)}
                    userProfilePicture={this.props.userProfilePicture}
                    userPercent={this.props.userScorePercent}
                    opponentProfilePicture={this.props.opponentProfilePicture}
                    opponentPercent={this.props.opponentScorePercent} />
            </View>
        )
    }

    _onAnimateUserIconComplete() {
        this.setState({
            showAllText: true
        })
    }

    _hideMessageAnimationComplete() {
        this.setState({
            moveUserIcon: true
        })
    }

    _showAllTextAnimationComplete() {
        this.props.onAnimationsFinished()
    }
}

function mapStateToProps(state: State, ownProps: Partial<ScoreDetailProps>) {
    return {
        ...ownProps,
        ...getScoreDetailsProps(state, ownProps)
    }
}

export default connect(mapStateToProps, undefined)(ScoreDetail)