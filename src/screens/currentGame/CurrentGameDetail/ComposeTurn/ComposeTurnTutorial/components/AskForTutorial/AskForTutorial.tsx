import React from 'react'
import {
    View,
    Image,
    Text
} from 'react-native'
import { askforTutorialStyles } from './AskForTutorialStyles'
import Images from '../../../../../../../shared/Images'
import DeclineAccept from '../../../../../../../components/DeclineAccept/DeclineAccept'
import { standardStyles } from '../../../../../../../styles/sharedStyles'

interface AskForTutorialProps {
    style?: any,
    width?: number
    onAccepted(): void,
    onDeclined(): void,
}

export default class AskForTutorial extends React.Component<AskForTutorialProps, any> {

    render() {
        return (
            <View style={[askforTutorialStyles.main, {width: this.props.width}]}>
                <View style={askforTutorialStyles.secondaryContainer}>
                    {this._renderTopForTutorial()}
                    <DeclineAccept onAcceptPress={this.props.onAccepted} onDeclinePressed={this.props.onDeclined} />
                </View>
            </View>
        )
    }

    _renderTopForTutorial() {
        return (
            <View style={[standardStyles.standardCell, askforTutorialStyles.topTutorialContainer]}>
                <Text style={askforTutorialStyles.askForTutorialText}>{'Want a quick tutorial?'}</Text>
                <Image source={Images.trumpTutorial} />
            </View>
        )
    }

    _renderAcceptDeclineButtons() {
        return (
            <DeclineAccept onAcceptPress={this.props.onAccepted} onDeclinePressed={this.props.onDeclined} />
        )
    }
}