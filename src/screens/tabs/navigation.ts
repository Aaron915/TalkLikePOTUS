import { TabNavigator } from 'react-navigation'
import { main, secondary } from '../../constants/colors'
import HomeNavigator from './home/navigaton/HomeNavigator'
import FriendsNavigator from './friends/navigation/FriendsNavigator'
import ProfileNavigator from './profile/navigation/ProfileNavigator'

const tabBarRoutes = {
    Friends: {
        screen: FriendsNavigator
    },
    Home: {
        screen: HomeNavigator
    },
    Profile: {
        screen: ProfileNavigator
    }
}

const tabStyle = {
    backgroundColor: main
}

const tabBarOptions = {
    style: tabStyle,
    inactiveTintColor: 'white',
    activeTintColor: secondary
}

const tabBarConfig = {
    initialRouteName: 'Home',
    tabBarOptions
}

export default TabNavigator(tabBarRoutes, tabBarConfig)
