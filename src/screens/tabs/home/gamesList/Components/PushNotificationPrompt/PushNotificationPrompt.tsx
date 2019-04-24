import {
    View,
    Text,
    Image
} from 'react-native'
import React from 'react'
import { pushNotificationPromptStyles } from './PushNotificationPromptStyles'
import DeclineAccept from '../../../../../../components/DeclineAccept/DeclineAccept'
import Images from '../../../../../../shared/Images'
import { standardStyles } from '../../../../../../styles/sharedStyles'

interface PushNotificationPromptProps {
    onDismissPressed: () => void,
    onAcceptPressed: () => void
}

export class PushNotificationPrompt extends React.Component<PushNotificationPromptProps, any> {
    render() {
        return (
            <View style={pushNotificationPromptStyles.main}>
                <View style={pushNotificationPromptStyles.subContainers}>
                    {this._renderAlert()}
                </View>
                <View style={pushNotificationPromptStyles.subContainers} />
            </View>
        )
    }

    _renderAlert() {
        return (
            <View>
                <View style={[pushNotificationPromptStyles.contentContainer, standardStyles.standardCell]}>
                    <Text style={pushNotificationPromptStyles.wantPushNotificationText}>{'Want Push Notifications?'}</Text>
                    <Image source={Images.notificationBell}/>
                    <Text style={pushNotificationPromptStyles.messageText}>{'We’ll send you updates on the games you are playing.'}</Text>
                </View>
                <DeclineAccept
                    onAcceptPress={this.props.onAcceptPressed}
                    onDeclinePressed={this.props.onDismissPressed} />
            </View>
        )
    }
}