import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    KeyboardAvoidingView
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styles from './EnterUserNameScreenStyles'
import EnterUserName from './components/EnterUserName'
import {
    State
} from '../../../types/state'
import { getUsername } from '../../../selectors/dataSelectors'
import { setUserName, userLeavingLogin } from '../../../actions/loginActions'
import { getUpdateUsernameFailed, getUsernameAlreadyTaken, getHomeScreenKey } from '../../../selectors/loginSelectors'
import { errorAlert } from '../../../utils/shared/Alerts'
import LoginBackground from '../../shared/LoginBackground/LoginBackground'

interface EnterUserNameScreenProps {
    setUsername: (username: string) => void
    hasUsername: boolean,
    usernameAlreadyTaken: boolean,
    updateUsernameFailed: boolean,
    navigation: any,
    homeScreenKey: string,
    goBackToHome: () => void,
    userLeavingLogin: () => void
}

class EnterUserNameScreen extends Component<EnterUserNameScreenProps, any> {
    render() {
        return (
            <View style={styles.container}>
                <LoginBackground>
                    <KeyboardAvoidingView
                        behavior={'padding'}
                        style={styles.keyboardAvoidingView}>
                        <EnterUserName
                            style={styles.enterUserNameView}
                            onSubmit={this._onUserNameSubmit.bind(this)} />
                    </KeyboardAvoidingView>
                </LoginBackground>
            </View>
        )
    }

    componentWillReceiveProps(props) {
        if (props.hasUsername) {
            this._exitLogin()
        } else if (props.usernameAlreadyTaken) {
            this._informUserNameIsTaken()
        } else if (props.updateUsernameFailed) {
            this._informUpdateUsernameFailed()
        }
    }

    _exitLogin() {
        this.props.goBackToHome()
    }

    _informUserNameIsTaken() {
        errorAlert('Username already taken.')
    }

    _informUpdateUsernameFailed() {
        // TODO: Give the user the option to retry.
        errorAlert('Update username failed')
    }

    _onUserNameSubmit(username: string) {
        this.props.setUsername(username)
    }
}

function mapDispatchToProps(dispatch, props: EnterUserNameScreenProps) {
    return {
        setUsername: (username: string) => { dispatch(setUserName(username)) },
        goBackToHome: () => dispatch(NavigationActions.back({ key: props.homeScreenKey })),
        userLeavingLogin: () => { dispatch(userLeavingLogin()) }
    }
}

function mapStateToProps(state: State) {
    const hasUsername = getUsername(state) !== undefined
    const updateUsernameFailed = getUpdateUsernameFailed(state)
    const usernameAlreadyTaken = getUsernameAlreadyTaken(state)
    const homeScreenKey = getHomeScreenKey(state)
    return {
        hasUsername,
        updateUsernameFailed,
        usernameAlreadyTaken,
        homeScreenKey
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterUserNameScreen)
