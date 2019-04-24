import React from 'react'
import {
   View,
   ImageBackground
} from 'react-native'
import Images from '../../../shared/Images'
import { loginBackgroundStyles } from './LoginBackgroundStyles'

export interface LoginBackgroundProps {
}

interface LoginBackgroundState {
}

export default class LoginBackground extends React.Component<LoginBackgroundProps, LoginBackgroundState> {

    render() {
        return(
            <View style={loginBackgroundStyles.background}>
                <ImageBackground style={loginBackgroundStyles.gradientImage} source={Images.gradientBackground}>
                {this.props.children}
                </ImageBackground>
            </View>
        )
    }
}