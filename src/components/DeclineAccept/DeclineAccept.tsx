import React from 'react'
import {
    View, TouchableOpacity, Text
} from 'react-native'
import { declineAcceptStyles } from './DeclineAcceptStylies'
import { standardStyles } from '../../styles/sharedStyles'
interface DeclineAcceptProps {
    style?: any
    onDeclinePressed: () => void,
    declineText?: string,
    onAcceptPress: () => void,
    acceptText?: string
}

export default class DeclineAccept extends React.Component<DeclineAcceptProps, any> {
    render() {
        const declineText = this.props.declineText || 'No, Thanks'
        const acceptText = this.props.acceptText || 'Sure'

        return (
            <View style={[declineAcceptStyles.main, this.props.style]}>
                <View style={[declineAcceptStyles.buttonContainers, standardStyles.standardCell, declineAcceptStyles.declineSide]}>
                    <TouchableOpacity
                        style={declineAcceptStyles.buttons}
                        onPress={this.props.onDeclinePressed} >
                        <Text style={[declineAcceptStyles.sharedText, declineAcceptStyles.declineText]}>{declineText}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[declineAcceptStyles.buttonContainers, standardStyles.standardCell]}>
                    <TouchableOpacity
                        style={declineAcceptStyles.buttons}
                        onPress={this.props.onAcceptPress} >
                        <Text style={[declineAcceptStyles.sharedText, declineAcceptStyles.acceptText]}>{acceptText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}