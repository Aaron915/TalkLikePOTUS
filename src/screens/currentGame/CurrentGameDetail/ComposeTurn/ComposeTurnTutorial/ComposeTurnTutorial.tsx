import React from 'react'
import {
    View, KeyboardAvoidingView, ScrollView
} from 'react-native'
import { composeTurnTutorialStyles } from './ComposeTurnTutorialStyles'
import AskForTutorial from './components/AskForTutorial/AskForTutorial'
import TwoWords from './components/TwoWords/TwoWords'
import ComposeMessage from './components/ComposeMessage/ComposeMessage'
import PotusButInfo from './components/POTUSBotInfo/POTUSBotInfo'
import ScoreHigher from './components/ScoreHigher/ScoreHigher'

interface ComposeTurnTutorialState {
    scrollEnabled: boolean,
    width: number,
    contentWidth: number,
    xPositionContent: number
}

interface ComposeTurnTutorialProps {
    onTutorialEnded(): void
}

export interface ChildLeftAndRightActions {
    onLeftPressed: () => void,
    onRightPressed: () => void,
    width: number
}

export default class ComposeTurnTutorial extends React.Component<ComposeTurnTutorialProps, ComposeTurnTutorialState> {

    // TODO: Having trouble getting the type for this to work correctly.
    scrollView: any

    constructor(props) {
        super(props)
        this.state = {
            scrollEnabled: true,
            width: 0,
            contentWidth: 0,
            xPositionContent: 0
        }
    }
    render() {
        return (
            <View style={composeTurnTutorialStyles.main}>
                <KeyboardAvoidingView style={composeTurnTutorialStyles.keyboardAvoidingView}>
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onScroll={this._onScroll.bind(this)}
                        contentContainerStyle={{ width: this.state.width * 5, flexDirection: 'row' }}
                        onLayout={this._listLayout.bind(this)}
                        onContentSizeChange={this._updateContentWidth.bind(this)}
                        scrollEnabled={this.state.scrollEnabled}
                        pagingEnabled={true}
                        horizontal={true}>
                        {this._renderAskForTutorial()}
                        {this._renderTwoWords()}
                        {this._renderComposeMessage()}
                        {this._renderPotusButInfo()}
                        {this._renderScoreHigher()}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }

    _updateContentWidth(contentWidth) {
        this.setState({
            contentWidth
        })
    }

    _listLayout({ nativeEvent: { layout } }) {
        this.setState({
            width: layout.width
        })
    }

    _renderAskForTutorial() {
        return (
            <AskForTutorial
                width={this.state.width}
                style={composeTurnTutorialStyles.tutorialContainers}
                onAccepted={this._goToNext.bind(this)}
                onDeclined={this.props.onTutorialEnded} />
        )
    }

    _renderTwoWords() {
        return (
            <TwoWords
                onLeftPressed={this._goToPrevious.bind(this)}
                onRightPressed={this._goToNext.bind(this)}
                width={this.state.width} />
        )
    }

    _renderComposeMessage() {
        return (
            <ComposeMessage
                onLeftPressed={this._goToPrevious.bind(this)}
                onRightPressed={this._goToNext.bind(this)}
                width={this.state.width} />
        )
    }

    _renderPotusButInfo() {
        return (
            <PotusButInfo
                onLeftPressed={this._goToPrevious.bind(this)}
                onRightPressed={this._goToNext.bind(this)}
                width={this.state.width} />
        )
    }

    _renderScoreHigher() {
        return (
            <ScoreHigher
             onConfirmedPressed={this.props.onTutorialEnded}
             onLeftPressed={this._goToPrevious.bind(this)}
             onRightPressed={this._goToNext.bind(this)}
             width={this.state.width} />
        )
    }

    _onScroll({ nativeEvent: { contentOffset: { x } } }) {
        this.setState({
            xPositionContent: x
        })
    }

    _goToNext() {
        const nextXPosition = this.state.xPositionContent + this.state.width
        this.scrollView.scrollTo({ x: nextXPosition, y: 0, animated: true })
    }

    _goToPrevious() {
        const nextXPosition = this.state.xPositionContent - this.state.width
        this.scrollView.scrollTo({ x: nextXPosition, y: 0, animated: true })
    }
}