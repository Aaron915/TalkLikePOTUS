import * as React from 'react'
import {
    View,
    Text,
    Image,
    Alert
} from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import styles from './LoginStartStyles'
import Images from '../../../shared/Images'
import { LoginStrings } from '../../../constants/strings'
import { setFbAuthToken, userLeavingLogin } from '../../../actions/loginActions'
import { State } from '../../../types/state'
import { errorAlert } from '../../../utils/shared/Alerts'
import { NavigationActions } from 'react-navigation'
import { getHomeScreenKey } from '../../../selectors/loginSelectors'
import { getUsername } from '../../../selectors/dataSelectors'
import LoginBackground from '../../shared/LoginBackground/LoginBackground'

interface LoginStartProps {
    navigation: any,
    setFbAuthToken: (token: string) => any,
    goToHome: boolean
    goToEnterUsername: boolean,
    displayFBAuthError: boolean,
    homeScreenKey: string,
    goBackToHome: () => void,
    completeLogin: () => void
}

interface LoginStartState { }

class LoginStart extends React.Component<LoginStartProps, LoginStartState> {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(nextProps: LoginStartProps) {

        if (nextProps.goToHome && !this.props.goToHome) {
            this.props.goBackToHome()
        } else if (nextProps.goToEnterUsername && !this.props.goToEnterUsername) {
            this._goToUserName()
        } else if (nextProps.displayFBAuthError && !this.props.displayFBAuthError) {
            this._showFailedFBAuthAlert()
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <LoginBackground>
                    <View style={styles.centerContainer}>
                        <Image source={Images.trumpWithPodium} />
                        <Text style={styles.quoteText}>
                            “This game is really great folks. It really is fantastic. You aren’t going to believe it.”
                    </Text>
                        <LoginButton
                            readPermissions={['public_profile', 'email', 'user_friends']}
                            onLoginFinished={this._handleFinishedLogin.bind(this)} />
                    </View>
                </LoginBackground>
            </View>
        )
    }

    _goToUserName() {
        this.props.navigation.navigate('EnterUserName')
    }

    _showFailedFBAuthAlert() {
        const title = 'Error'
        const failedText = 'Unable to authenticate with facebook at this time.'
        const firstButton = {
            title: 'Retry',
            onPress: () => [

            ]
        }

        // TODO: Retry posting of the token here.
        errorAlert(failedText)
        Alert.alert(title, failedText, [firstButton])
    }

    _handleFinishedLogin(error, result) {
        if (error) {
            this._handleFBLoginError(error)
        } else if (!result.isCancelled) {
            this._fetchAndSetAccessToken()
        }
    }

    _handleFBLoginError(_error) {
        errorAlert(LoginStrings.FACEBOOK_LOGIN_ERROR_MESSAGE)
    }

    _fetchAndSetAccessToken() {
        AccessToken.getCurrentAccessToken().then(({ accessToken }) => {
            this._loginSuccessful(accessToken)
        }).catch((err) => {
            console.warn(err)
            this._handleFBLoginError(err)
        })
    }

    _loginSuccessful(token: string) {
        this.props.setFbAuthToken(token)
    }
}

function mapDispatchToProps(dispatch, props: LoginStartProps) {
    return {
        setFbAuthToken: (token: string) => { dispatch(setFbAuthToken(token)) },
        goBackToHome: () => { dispatch(NavigationActions.back({ key: props.homeScreenKey })) },
        completeLogin: () => { dispatch(userLeavingLogin()) }
    }
}

function mapStateToProps(state: State) {

    const hasAuthToken = state.auth.bearerToken !== undefined
    const hasUserName = getUsername(state) !== undefined
    const fbAuthFailed = state.login.fbLoginFailed
    const homeScreenKey = getHomeScreenKey(state)

    const goToHome = hasUserName
    const goToEnterUsername = hasAuthToken && !hasUserName
    const displayFBAuthError = fbAuthFailed

    return {
        goToHome,
        goToEnterUsername,
        displayFBAuthError,
        homeScreenKey
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginStart)
