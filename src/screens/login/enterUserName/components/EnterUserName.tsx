import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import styles from './EnterUserNameStyles'
import Images from '../../../../shared/Images'
import {
    LoginStrings
} from '../../../../constants/strings'
import LargeRedButton from '../../../../components/LargeRedButton/LargeRedButton'
import EnterUserNameField from '../../../../components/EnterUserNameField/EnterUserNameField'

interface EnterUserNameProps {
    style: any,
    onSubmit: (userName: string) => void
}

interface EnterUserNameState {
    text?: string
}

export default class EnterUserName extends Component<EnterUserNameProps, EnterUserNameState> {

    constructor(props) {
        super(props)
        this.state = {
            text: undefined
        }
    }
    render() {
        return (
            <View style={StyleSheet.flatten([styles.container, this.props.style])}>
                <View style={styles.contentContainer}>
                    {this._renderLogoAndQuote()}
                    <EnterUserNameField
                    onUserNameChanged={this._onUserNameTextChanged.bind(this)}
                    invalidUsernameEntered={this._invalidUserNameEntered.bind(this)}
                    placeholder={'Create Username'} />
                    <LargeRedButton title={LoginStrings.SUBMIT} enabled={this.state.text !== undefined} onPress={this._submitButtonPressed.bind(this)} />
                </View>
            </View>
        )
    }

    _renderLogoAndQuote() {
        return (
            <View
                style={styles.topContainer}>
                <Image
                    source={Images.trumpTwitterProfile} />
                <Text
                    style={styles.trumpQuoteText}>
                    “I’m very highly educated. I know words, I have the best words” - POTUS
               </Text>
            </View>
        )
    }

    _invalidUserNameEntered() {
        this.setState({
            text: undefined
        })
    }

    _onUserNameTextChanged(text) {
        this.setState({
            text
        })
    }

    _submitButtonPressed() {
        this.props.onSubmit(this.state.text)
    }
}