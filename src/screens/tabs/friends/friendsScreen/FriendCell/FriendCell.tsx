import React from 'react'
import {
    TouchableWithoutFeedback,
    Text,
    Image,
    View
} from 'react-native'
import { friendCellStyles } from './FriendCellStyles'
import { standardStyles } from '../../../../../styles/sharedStyles'

interface FriendCellProps {
    imageUrl?: string
    name: string,
    id: string,
    onPress: (id: string) => void
}

export default class FriendCell extends React.Component<FriendCellProps, any> {
    render() {
        return (
            <TouchableWithoutFeedback
            onPress={this._cellPressed.bind(this)}>
                <View style={[friendCellStyles.main, standardStyles.standardCell]}>
                    <Image style={friendCellStyles.image} source={{uri: this.props.imageUrl}}/>
                    <Text style={friendCellStyles.text}>{this.props.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _cellPressed() {
        this.props.onPress(this.props.id)
    }
}