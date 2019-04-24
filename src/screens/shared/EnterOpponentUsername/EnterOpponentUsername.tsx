import React from 'react'
import {
    View, KeyboardAvoidingView, Image, TouchableWithoutFeedback, Modal
} from 'react-native'
import Images from './../../../shared/Images'
import {
    enterOpponentUsernameStyles
} from './EnterOpponentUsernameStyles'
import {
    standardStyles
} from '../../../styles/sharedStyles'
import EnterUserNameField from '../../../components/EnterUserNameField/EnterUserNameField'
import LargeRedButton from '../../../components/LargeRedButton/LargeRedButton'

interface EnterOpponentUsernameProps {
    show: boolean
    onUsernameSelected: (username: string) => void,
    onUserDismiss: () => void
}

interface EnterOpponentUsernameState {
    show: boolean,
    usernameText?: string
}

export default class EnterOpponentUsername extends React.Component<EnterOpponentUsernameProps, EnterOpponentUsernameState> {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.show && !this.props.show) {
            this._showContent()
        } else if (!props.show && this.props.show) {
            this._hideContent()
        }
    }

    render() {
        const pointerEvents = this.props.show ? 'auto' : 'none'
        return (
            <Modal
            transparent={true}
            visible={this.state.show}
            animationType={'fade'}>
             <View style={[enterOpponentUsernameStyles.main]} pointerEvents={pointerEvents}>
                     <TouchableWithoutFeedback style={enterOpponentUsernameStyles.animatedBackground} onPress={this.props.onUserDismiss}>
                         <View style={enterOpponentUsernameStyles.transparentBackground}>
                             <KeyboardAvoidingView behavior={'padding'} style={enterOpponentUsernameStyles.keyboardAvoidingView}>
                                 {this._renderContent()}
                             </KeyboardAvoidingView>
                         </View>
                     </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }

    _hideContent() {
        this.setState({
            show: false
        })
    }

    _showContent() {
        this.setState({
            show: true
        })
    }

    _renderContent() {
        if (this.state.show) {
            return (
                <View style={[enterOpponentUsernameStyles.contentContainerView, standardStyles.standardCell]}>
                    <Image style={enterOpponentUsernameStyles.trumpIcon} source={Images.trumpBlueIcon64} />
                    <EnterUserNameField
                        onUserNameChanged={this._usernameChanged.bind(this)}
                        invalidUsernameEntered={this._invalidUserNameEntered.bind(this)}
                        placeholder={'Enter Username'} />
                    <LargeRedButton title={`Challenge`} onPress={this._challengeButtonPressed.bind(this)} enabled={this.state.usernameText !== undefined} />
                </View>
            )
        }

        return undefined
    }

    _challengeButtonPressed() {
        this.props.onUsernameSelected(this.state.usernameText)
    }

    _usernameChanged(username) {
        this.setState({
            usernameText: username
        })
    }

    _invalidUserNameEntered() {
        this.setState({
            usernameText: undefined
        })
    }
}
