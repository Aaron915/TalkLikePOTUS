import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Image } from 'react-native'
import { standardNavigationOptions } from '../../../navigation/standardNavigationOptions'
import Profile from '../Profile/Profile'
import Images from '../../../../shared/Images'

const routeConfig = {
    Profile: {
        screen: Profile
    }
}

const navigatorConfig = {
    initialRouteName: 'Profile',
    navigationOptions: {
        ...standardNavigationOptions,
        tabBarIcon: ({tintColor}) => {
            return (
                <Image
                source={Images.profileTabIcon}
                style={{tintColor}} />
            )
        },
        title: 'Profile'
    }
}

export default StackNavigator(routeConfig, navigatorConfig)
