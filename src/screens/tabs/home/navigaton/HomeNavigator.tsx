import GamesList from '../gamesList/GamesList'
import React from 'react'
import { Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { standardNavigationOptions } from '../../../navigation/standardNavigationOptions'
import CurrentGameDetail from '../../../currentGame/CurrentGameDetail/CurrentGameDetail'
import Images from '../../../../shared/Images'

const routeConfig = {
    GamesList: {
        screen: GamesList
    },
    CurrentGameDetail: {
        screen: CurrentGameDetail
    }
}

const navigatorConfig = {
    initialRouteName: 'GamesList',
    navigationOptions: {
        ...standardNavigationOptions,
        tabBarIcon: ({tintColor}) => {
            return (
                <Image
                source={Images.houseTab}
                style={{tintColor}} />
            )
        }
    }
}

export default StackNavigator(routeConfig, navigatorConfig)
