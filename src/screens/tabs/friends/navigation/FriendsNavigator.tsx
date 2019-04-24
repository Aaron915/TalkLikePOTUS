import React from 'react'
import { Image } from 'react-native'
import FriendsScreen from '../friendsScreen/FriendsScreen'
import { StackNavigator } from 'react-navigation'
import { standardNavigationOptions } from '../../../navigation/standardNavigationOptions'
import { currentGameNav } from '../../../currentGame/navigation'
import Images from '../../../../shared/Images'

const routeConfig = {
    FriendsScreen: {
        screen: FriendsScreen
    }, ...currentGameNav
}

const navigatorConfig = {
    initialRouteName: 'FriendsScreen',
    navigationOptions: {
        ...standardNavigationOptions,
        tabBarIcon: ({tintColor}) => {
            return (
                <Image
                source={Images.friendsTab}
                style={{tintColor}} />
            )
        }
    }
}

export default StackNavigator(routeConfig, navigatorConfig)