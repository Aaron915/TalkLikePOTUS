import React from 'react'
import {
    View,
    Image,
    Text,
    Animated,
    StyleSheet
} from 'react-native'
import { potusBotStyles } from './PotusBotStyles'
import Images from '../../../../../../shared/Images'
import { main, standardGreen, secondary } from '../../../../../../constants/colors'
export interface PotusBotProps {
    style: any,
    userWon?: boolean,
    userScore: string,
    textFadeDuration: number,
    transistionAnimationLength: number,
    // triggers the first animation that hides the text for the score.
    hideMessageText: boolean,
    onHideMessageComplete: () => void
    // triggers the animation that causes the text to reappear.
    showAllText: boolean,
    onShowAllTextComplete: () => void
}
import { AnimatedValue } from 'react-navigation'

interface PotusBotState {
    hideScore: boolean
    messageTextOpacity: AnimatedValue,
    scoreTextOpacity: AnimatedValue
}

export default class PotusBot extends React.Component<PotusBotProps, PotusBotState> {
    constructor(props) {
        super(props)
        this.state = {
            hideScore: true,
            messageTextOpacity: new Animated.Value(1),
            scoreTextOpacity: new Animated.Value(0)
        }
    }
    render() {
        return (
            <View style={[potusBotStyles.main, this.props.style]}>
                <Image style={potusBotStyles.image} source={Images.PotusBot} />
                {this._renderText()}
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showAllText && nextProps.showAllText) {
            this._showScoreAndMessageText()
        } else if (!this.props.hideMessageText && nextProps.hideMessageText) {
            this._hideMessageText()
        }
    }
    _renderText() {
        const roundStatus = this._roundStatusText()
        const roundStatusColor = this._roundStatusColor()

        const messageTextStyle = StyleSheet.flatten([potusBotStyles.roundStatusStyle, { color: roundStatusColor, opacity: this.state.messageTextOpacity }])
        const scoreTextStyle = StyleSheet.flatten([potusBotStyles.scoreText, { opacity: this.state.scoreTextOpacity }])

        return (
            <View style={potusBotStyles.textContainer}>
                <Text style={potusBotStyles.potusTitleText}>POTUS BOT</Text>
                <Animated.Text style={messageTextStyle}>{roundStatus}</Animated.Text>
                <Animated.Text style={scoreTextStyle}>{this.props.userScore || ''}</Animated.Text>
            </View>
        )
    }

    _roundStatusText(): string {
        if (!this.props.userScore || this.state.hideScore) {
            return 'Deciding your score...'
        } else if (this.props.userWon === undefined) {
            return 'Waiting for opponent...'
        } else if (this.props.userWon) {
            return 'You won the round!'
        }

        return 'You lost the round'
    }

    _roundStatusColor(): string {
        if (!this.props.userScore || this.state.hideScore) {
            return main
        } else if (this.props.userWon === undefined) {
            return main
        } else if (this.props.userWon) {
            return standardGreen
        }

        return secondary
    }

    _hideMessageText() {
        Animated.sequence([
            Animated.timing(
                this.state.messageTextOpacity,
                {
                    toValue: 0.0,
                    duration: 500,
                    delay: 2000
                }
            )
        ]).start(this.props.onHideMessageComplete.bind(this))
    }

    _showScoreAndMessageText() {
            this.setState({
                hideScore: false
            })
            const animationDuration = 1000
            Animated.parallel([
                Animated.timing(
                    this.state.messageTextOpacity,
                    {
                        toValue: 1.0,
                        duration: animationDuration,
                        delay: 1000
                    }
                ),
                Animated.timing(
                    this.state.scoreTextOpacity,
                    {
                        toValue: 1.0,
                        duration: animationDuration,
                        delay: 1000
                    }
                )
            ]).start(this.props.onShowAllTextComplete)
    }
}