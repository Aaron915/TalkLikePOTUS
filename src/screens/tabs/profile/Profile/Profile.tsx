import React from 'react'
import {
    View,
    Image,
    Text,
    Switch
} from 'react-native'
import * as PushNotification from 'react-native-push-notification'
import { profileStyles } from './ProfileStyles'
import { standardStyles } from '../../../../styles/sharedStyles'
import { connect } from 'react-redux'
import { State } from '../../../../types/state'
import { getProfileProps } from '../../../../selectors/profileSelectors'
import { clearPushNotificationId } from '../../../../actions/pushNotificationActions'

export interface ProfileProps {
    disablePushNotifications: () => void
    profilePicURL?: string
    userFullName?: string,
    username?: string,
    pushNotifcationsEnabled: boolean
}

interface ProfileState {
    pushNotificationsSwitch?: boolean
}

class Profile extends React.Component<ProfileProps, ProfileState> {

    constructor(props) {
        super(props)
        this.state = {
            pushNotificationsSwitch: false
        }
        this._evaluateIfStateShouldBeChanged(props)
    }

    componentWillReceiveProps(props) {
        this._evaluateIfStateShouldBeChanged(props)
    }

    componentDidMount() {
        this.setState({
            pushNotificationsSwitch: this.props.pushNotifcationsEnabled
        })
    }

    render() {
        return (
            <View style={profileStyles.main}>
                {this._renderUserInfo()}
                {this._renderSeparator()}
                {this._renderPushNotifications()}
            </View>
        )
    }

    _renderUserInfo() {
        return (
            <View style={[standardStyles.standardCell, profileStyles.cell]}>
                <Image style={profileStyles.image} source={{ uri: this.props.profilePicURL }} />
                <View style={profileStyles.textContainers}>
                    <Text style={profileStyles.boldedText}>{this.props.userFullName}</Text>
                    <Text style={profileStyles.usernameText}>{`username: ${this.props.username || ''}`}</Text>
                </View>
            </View>
        )
    }

    _renderSeparator() {
        return (
            <View style={standardStyles.seperatorView} />
        )
    }

    _renderPushNotifications() {
        return (
            <View style={[standardStyles.standardCell, profileStyles.cell, profileStyles.pushNotificationsCell]}>
                <View style={profileStyles.textContainers}>
                    <Text style={profileStyles.boldedText}>Push Notifications</Text>
                    <Text style={profileStyles.pushNotificationMessageText}>{'We’ll send you updates on the games\nyou are playing.'}</Text>
                </View>
                <View style={profileStyles.switchContainer}>
                    <Switch
                        onValueChange={this._onSwitchValueChange.bind(this)}
                        value={this.state.pushNotificationsSwitch} />
                </View>
            </View>
        )
    }

    _evaluateIfStateShouldBeChanged(newProps: ProfileProps) {
        if (newProps.pushNotifcationsEnabled !== this.props.pushNotifcationsEnabled) {
            this.setState({
                pushNotificationsSwitch: newProps.pushNotifcationsEnabled
            })
        }
    }

    _onSwitchValueChange(enabled: boolean) {
        if (enabled) {
            this.setState({
                pushNotificationsSwitch: true
            })
            PushNotification.requestPermissions()
        } else {
            this.setState({
                pushNotificationsSwitch: false
            })
            this.props.disablePushNotifications()
        }
    }
}

function mapDispatchToActions(dispatch): Partial<ProfileProps> {
    return {
        disablePushNotifications: () => {dispatch(clearPushNotificationId())}
    }
}

function mapStateToProps(state: State) {
    return {
        ...getProfileProps(state)
    }
}

export default connect(mapStateToProps, mapDispatchToActions)(Profile)