import React from 'react'
import {
    View,
    TextInput,
    Text
} from 'react-native'
import {
    validateUserName,
    messageForError
} from '../../utils/login/userNameValidation'
import { lightGreyTextColor } from '../../constants/colors'
import { styles } from './EnterUserNameFieldStyles'
export interface EnterUserNameFieldProps {
    // Updates as the user is entering text. If the username is invalid, undefined is passed.
    onUserNameChanged: (text: string) => void,
    invalidUsernameEntered: () => void,
    placeholder: string
}

export interface EnterUserNameFieldState {
    text?: string,
    errorMessage?: string,
}

export default class EnterUserNameField extends React.Component<EnterUserNameFieldProps, EnterUserNameFieldState> {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <View>
                <TextInput
                    autoCapitalize={'none'}
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={false}
                    autoFocus={true}
                    onChangeText={this._userNameTextChanged.bind(this)}
                    style={styles.textInput}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={lightGreyTextColor} />
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
        )
    }

    _userNameTextChanged(text) {
        try {
            const userName = validateUserName(text)
            this.setState({
                text: userName,
                errorMessage: ''
            })
            this.props.onUserNameChanged(text)
        } catch (err) {
            this.setState({
                errorMessage: messageForError(err),
                text
            })
            this.props.invalidUsernameEntered()
        }
    }
}