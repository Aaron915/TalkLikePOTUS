import React from 'react'
import {
    View, TouchableOpacity, Text
} from 'react-native'
import { ForfeitButtonProps } from '../../RoundDetail'
import { daysTillCanForceForfeit } from '../../../../../../constants/appConstants'
import { standardStyles } from '../../../../../../styles/sharedStyles'
import { forfeitButtonStyles } from './ForfeitButtonStyles'

interface ForfeitButtonState {
}

export default class ForfeitButton extends React.Component<ForfeitButtonProps, ForfeitButtonState> {

    render() {
        const text = this.props.forfeitUser ?
            'Forfeit' : `Forfeit ${this.props.opponentName} (Inactive for ${daysTillCanForceForfeit} days)`
        return (
            <View
                style={standardStyles.standardCell}>
                <TouchableOpacity
                    style={forfeitButtonStyles.button}
                    onPress={this.props.onPress}>
                    <Text style={forfeitButtonStyles.text}>{text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}