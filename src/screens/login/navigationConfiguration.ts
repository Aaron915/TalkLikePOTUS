import LoginStart from './loginStart/LoginStart'
import EnterUserNameScreen from './enterUserName/EnterUserNameScreen'
import { StackNavigator, HeaderMode } from 'react-navigation'

const routeConfiguration = {
    Start: {
        screen: LoginStart
    },
    EnterUserName: {
        screen: EnterUserNameScreen
    }
}

const stackNavigationConfiguration = {
    headerMode: 'none' as HeaderMode,
    navigationOptions: {
        gesturesEnabled: false
    }
}

export const loginNavigation = StackNavigator(routeConfiguration, stackNavigationConfiguration)