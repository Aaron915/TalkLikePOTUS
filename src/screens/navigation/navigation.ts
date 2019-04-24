// import { tabsNavigator } from './../tabs/navigationConfiguration'
import Tab from '../tabs/MainTabContainer'
import { HeaderMode, StackNavigator, NavigationActions } from 'react-navigation'
import { loginNavigation } from '../login/navigationConfiguration'

const routeConfiguration = {
    Main: {
        screen: Tab
    },
    Login: {
        screen: loginNavigation
    }
}

const stackNavigationConfig = {
    // TODO: Figure out whats going on with these.
    headerMode: 'none' as HeaderMode,
    mode: 'modal' as 'modal',
    navigationOptions: {
        gesturesEnabled: false
    }
}

const MainNavigator = StackNavigator(routeConfiguration, stackNavigationConfig)

const initialNavState = MainNavigator.router.getStateForAction(NavigationActions.init(), undefined)

const navReducer = (state = initialNavState, action) => {
    const nextState =  MainNavigator.router.getStateForAction(action, state)
    return nextState || state
}

export {
    MainNavigator,
    navReducer
}