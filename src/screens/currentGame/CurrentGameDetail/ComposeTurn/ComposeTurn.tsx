import React from 'react'
import {
    View,
    StatusBar,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native'
import Images from '../../../../shared/Images'
import { connect } from 'react-redux'
import ImageButton from '../../../../components/ImageButton/ImageButton'
import { RoundInterfaceProps } from '../../../../selectors/roundSelectors'
import { getComposeTurnProps } from '../../../../selectors/composeTurnSelectors'
import { composeTurnStyles } from './ComposeTurnStyles'
import { setText, submitText, resetComposeTurnState } from '../../../../actions/composeTurnActions'
import { hasSeenTutorialPrompt } from '../../../../actions/featurePromptActions'
import ScoreDetail from '../ScoreDetail/ScoreDetail'
import ComposeTurnTutorial from './ComposeTurnTutorial/ComposeTurnTutorial'
import { transparent } from '../../../../constants/colors'

export interface ComposeTurnProps extends RoundInterfaceProps {
    hasSeenTutorialPrompt?: boolean,
    submitText?: () => void,
    cancelPressed: () => void,
    requiredWords?: string[],
    requiredWordsIncluded?: boolean[],
    charactersRemaining?: number,
    submitEnabled?: boolean,
    splitupText?: string[],
    updateComposeText?(text: string): void,
    onShowDetailDismiss?(): void,
    resetComposeTurnState?(): void,
    tutorialHasBeenShown(): void
}

interface ComposeTurnState {
    showScoreDetail: boolean,
    canDismissScoreDetail: boolean,
    showTutorial: boolean
}

class ComposeTurn extends React.Component<ComposeTurnProps, ComposeTurnState> {
    // Timer for dismissing the compose turn
    _timer: any

    constructor(props) {
        super(props)
        this.state = {
            canDismissScoreDetail: false,
            showScoreDetail: false,
            showTutorial: false
        }
    }
    render() {
        return (
            <View style={composeTurnStyles.main}>
                <StatusBar barStyle={'default'} />
                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={composeTurnStyles.contentView} >
                    <View>
                        {this._renderTopBar()}
                        {this._renderText()}
                    </View>
                    {this._renderBottomBar()}
                </KeyboardAvoidingView>
                {this._renderScoreDetailModal()}
                {this._renderTutorialModal()}
            </View>
        )
    }

    componentDidMount() {
        this._determineIfTutorialShouldBeShown(this.props)
    }

    componentWillUnmount() {
        this.props.resetComposeTurnState()
        if (this._timer) {
            clearTimeout(this._timer)
        }
    }

    _renderTopBar() {
        if (!this.props.requiredWords || this.props.requiredWords.length !== 2) {
            return undefined
        }
        if (!this.props.requiredWordsIncluded || this.props.requiredWordsIncluded.length !== 2) {
            return undefined
        }

        const words = this.props.requiredWords
        const included = this.props.requiredWordsIncluded
        return (
            <View style={composeTurnStyles.topBarContainer}>
                <View>
                    <ImageButton image={Images.X} onPress={this._cancelPressed.bind(this)} />
                </View>
                <View style={composeTurnStyles.requiredWordsContainer}>
                    {this._renderRequiredPhrase(words[0], included[0], true)}
                    {this._renderRequiredPhrase(words[1], included[1], false)}
                </View>
            </View>
        )
    }

    _renderRequiredPhrase(phrase: string, included: boolean, top: boolean) {
        let style = [composeTurnStyles.standardRequiredText]

        if (top) {
            style.push(composeTurnStyles.requiredWordTop)
        } else {
            style.push(composeTurnStyles.requiredWordBottom)
        }

        if (included) {
            style.push(composeTurnStyles.includedText)
        } else {
            style.push(composeTurnStyles.notIncludedText)
        }

        return (
            <Text style={style}>{phrase}</Text>
        )
    }

    _renderText() {
        return (
            <TextInput
                underlineColorAndroid={transparent}
                style={composeTurnStyles.standardText}
                multiline={true}
                blurOnSubmit={false}
                autoFocus={true}
                onChangeText={this.props.updateComposeText}>
                {
                    this.props.splitupText.map((text, idx) => {
                        // TODO: It would be nice to move this logic somewhere better.
                        const textLowercase = text.toLowerCase()
                        const requiredWordsLowercase = this.props.requiredWords.map(word => word.toLowerCase())
                        const style = requiredWordsLowercase.find(word => word === textLowercase) === undefined
                            ? composeTurnStyles.standardText : composeTurnStyles.boldedText
                        return <Text style={style} key={idx}>{text}</Text>
                    })
                }
            </TextInput>
        )
    }

    _renderBottomBar() {
        return (
            <View style={composeTurnStyles.bottomBar}>
                <Text style={composeTurnStyles.characterCount}>{this.props.charactersRemaining}</Text>
                {this._renderSubmitButton()}
            </View>
        )
    }

    _renderSubmitButton() {
        const disable = !this.props.submitEnabled
        const style = disable ? composeTurnStyles.submitButtonDisabled : composeTurnStyles.submitButton
        return (
            <TouchableOpacity
                disabled={disable}
                style={style}
                onPress={this._submitPressed.bind(this)} >
                <Text style={composeTurnStyles.whiteText}>{'Submit'}</Text>
            </TouchableOpacity>
        )
    }

    _renderScoreDetailModal() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.showScoreDetail}>
                        <ScoreDetail
                        onOutsideContentPress={this._scoreDetailPress.bind(this)}
                        roundNumber={this.props.roundNumber}
                        onAnimationsFinished={this._allowForDismissal.bind(this)} />
            </Modal>
        )
    }

    _renderTutorialModal() {
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.showTutorial} >
                    <ComposeTurnTutorial onTutorialEnded={this._declineTutorialPressed.bind(this)}/>
            </Modal>
        )
    }

    _declineTutorialPressed() {
        this.setState({
            showTutorial: false
        })
    }

    _allowForDismissal() {
        this.setState({
            canDismissScoreDetail: true
        })
        this._timer = setTimeout(this._scoreDetailPress.bind(this), 3000)
    }

    _scoreDetailPress() {
        if (this.state.canDismissScoreDetail) {
            this.setState({
                showScoreDetail: false
            })
            setTimeout(() => this.props.onShowDetailDismiss(), 1000)
        }
    }

    _submitPressed() {
        this.props.submitText()
        this.setState({
            showScoreDetail: true
        })
    }

    _cancelPressed() {
        this.props.cancelPressed()
    }

    _determineIfTutorialShouldBeShown(props: ComposeTurnProps) {
        if (!props.hasSeenTutorialPrompt) {
            this.setState({
                showTutorial: true
            })
            this.props.tutorialHasBeenShown()
        }
    }
}

function mapDispatchToProps(dispatch): Partial<ComposeTurnProps> {
    return {
        updateComposeText: (text: string) => { dispatch(setText(text)) },
        submitText: () => {dispatch(submitText())},
        resetComposeTurnState: () => {dispatch(resetComposeTurnState())},
        tutorialHasBeenShown: () => {dispatch(hasSeenTutorialPrompt())}
    }
}

function mapStateToProps(state, props): Partial<ComposeTurnProps> {
    return {
        ...getComposeTurnProps(state, props)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeTurn)