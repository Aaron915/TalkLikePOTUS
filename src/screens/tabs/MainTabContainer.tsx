import React from 'react'
import { connect } from 'react-redux'
import { AppState, View } from 'react-native'
import MainTab from './navigation'
import { State } from '../../types/state'
import { getBearerToken } from '../../selectors/authSelectors'
import { setHomeScreenKey, userEnteringLogin } from '../../actions/loginActions'
import { loadStartData } from '../../actions/dataActions'
import { mainTabContainerStyles } from './MainTabContainerStyles'

interface MainTabContainerProps {
    isAuthenticated: boolean,
    userInLogin: boolean
    navigation: any,
    setNavKey: () => void,
    updateInLogin: () => void,
    loadStartData: () => void
}

class MainTabContainer extends React.Component<any, any> {

    constructor(props: MainTabContainerProps) {
        super(props)
        this._handleNewProps(props)
    }

    componentDidMount() {
        AppState.addEventListener('change', this._appStateChange.bind(this))
    }

    componentWillUnmount() {
        AppState.addEventListener('change', this._appStateChange.bind(this))
    }
    componentWillReceiveProps(props) {
        this._handleNewProps(props)
    }

    render() {
        return (
            <View style={mainTabContainerStyles.main}>
                <View style={mainTabContainerStyles.adSeperator} />
                <View style={mainTabContainerStyles.adContainer}>
                </View>
                <MainTab />
            </View>
        )
    }

    _handleNewProps(props: MainTabContainerProps) {
        if (!props.isAuthenticated && !props.userInLogin) {
            this._goToLogin(props)
        }
    }

    _goToLogin(props: MainTabContainerProps) {
        props.navigation.navigate('Login')
        props.updateInLogin()
        props.setNavKey()
    }

    _appStateChange(state: string) {
        if (state === 'active') {
            if (this.props.isAuthenticated) {
                this.props.loadStartData()
            }
        }
    }
}

function mapDispatchToProps(dispatch, props: MainTabContainerProps) {
    return {
        setNavKey: () => { dispatch(setHomeScreenKey(props.navigation.state.key)) },
        updateInLogin: () => { dispatch(userEnteringLogin()) },
        loadStartData: () => { dispatch(loadStartData()) }
    }
}

function mapStateToProps(state: State) {
    const isAuthenticated = getBearerToken(state) !== undefined

    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabContainer)