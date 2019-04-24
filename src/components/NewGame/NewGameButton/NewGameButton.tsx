import React from 'react'
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import { styles } from './NewGameButtonStyles'

interface NewGameButtonProps {
    image: any,
    onPress: () => void
    title: string
}

export default class NewGameButton extends React.Component<NewGameButtonProps, any> {
    render() {
        return (
            <TouchableOpacity
            onPress={this.props.onPress}
            style={styles.main}>
                <Image source={this.props.image}/>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
