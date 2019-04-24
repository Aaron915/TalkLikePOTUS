import React from 'react'
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native'
import { styles } from './LargeRedButtonStyles'
interface LargeRedButtonProps {
    title: string,
    onPress: () => void,
    enabled: boolean,
    style?: any,
    textStyle?: any
}

export default class LargeRedButton extends React.Component<LargeRedButtonProps, any> {
    render() {
        return (
            <View>
                <TouchableOpacity
                    disabled={!this.props.enabled}
                    onPress={this.props.onPress}
                    style={[styles.main, this.props.style]} >
                    <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}