import React from 'react'
import {
    TouchableOpacity,
    Image
} from 'react-native'

export interface ImageButtonProps {
    image: any,
    onPress: () => void,
    style?: any
}

export default class ImageButton extends React.Component<ImageButtonProps, any> {
    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.props.onPress.bind(this)}>
                <Image source={this.props.image} />
            </TouchableOpacity>
        )
    }
}