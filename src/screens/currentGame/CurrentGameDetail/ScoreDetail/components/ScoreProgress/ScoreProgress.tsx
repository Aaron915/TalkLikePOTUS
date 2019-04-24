import React from 'react'
import {
    View,
    Image,
    Animated
} from 'react-native'
import Images from '../../../../../../shared/Images'
import { scoreProgressStyles, triangleTopMargin,  scoreProgressSpacing } from './ScoreProgressStyles'
import { standardStyles } from '../../../../../../styles/sharedStyles'
import { AnimatedValue } from 'react-navigation'

export interface ScoreProgressProps {
    // Triggers the animation for the user's score.
    animateUserScore: boolean
    onUserScoreAnimationComplete: () => void
    userProfilePicture?: string,
    userPercent?: number,
    opponentProfilePicture?: string,
    opponentPercent?: number,
}

interface ScoreProgressState {
    progressBarWidth: number,
    progressBarHeight: number,
    maxUserIconIndicatorHeight: number,
    userAnimationLeft: AnimatedValue
}

export default class ScoreProgress extends React.Component<ScoreProgressProps, ScoreProgressState> {

    constructor(props) {
        super(props)
        this.state = {
            progressBarHeight: 0,
            progressBarWidth: 0,
            maxUserIconIndicatorHeight: 0,
            userAnimationLeft: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: ScoreProgressProps) {
        if (!this.props.animateUserScore && nextProps.animateUserScore) {
            this._animateUserScore()
        }
    }

    render() {
        return (
            <View>
                {this._renderUserIcons()}
                <Image
                    onLayout={this._progressBarLayout.bind(this)}
                    style={scoreProgressStyles.progressBar}
                    source={Images.trumpProgressBar}
                    resizeMode={'cover'} />
            </View>
        )
    }

    _animateUserScore() {
            Animated.sequence([
                Animated.timing(
                    this.state.userAnimationLeft,
                {
                    toValue: this.props.userPercent * this.state.progressBarWidth,
                    duration: 1000,
                    delay: 1000
                })
            ]).start(this.props.onUserScoreAnimationComplete)
    }

    _progressBarLayout({ nativeEvent: { layout } }) {
        this.setState({
            progressBarHeight: layout.height,
            progressBarWidth: layout.width
        })
    }

    _renderUserIcons() {

        // TODO: maybe move the 5.5?
        const fullHeight = this.state.progressBarHeight + triangleTopMargin + this.state.maxUserIconIndicatorHeight + scoreProgressSpacing

        return (
            <View style={[scoreProgressStyles.userIconsContainer, {height: fullHeight}]}>
                {this._renderUserIcon(true, this.props.userProfilePicture, this.props.userPercent, this.state.userAnimationLeft)}
                {this._renderUserIcon(false, this.props.opponentProfilePicture, this.props.opponentPercent)}
            </View>
        )
    }

    _renderUserIcon(isThisUser: boolean, img?: string, percent?: number, animationValue?: AnimatedValue) {
        if (!img || !percent) {
            return undefined
        }

        const opacity = isThisUser ? 1.0 : 0.66
        let left = 0
        if (isThisUser) {
            left = animationValue
        } else {
            left = this.state.progressBarWidth * percent
        }

        console.log(`left: ${left}`)
        return (
            <Animated.View
                onLayout={this._onUserIconIndicatorLayout.bind(this)}
                style={[scoreProgressStyles.userScoreIndicator, { opacity, left }]}>
                <Image
                    style={standardStyles.standardSizedProfilePic}
                    source={{ uri: img }} />
                <Image
                    style={scoreProgressStyles.userScoreIndicatorTriangle}
                    source={Images.userTriangle} />
            </Animated.View>
        )
    }

    _onUserIconIndicatorLayout({ nativeEvent: { layout } }) {
        const width = layout.width
        if (width > this.state.maxUserIconIndicatorHeight) {
            this.setState({
                maxUserIconIndicatorHeight: width
            })
        }
    }
}