import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import Images from '../../../../../../shared/Images'
import { headerStyles } from './RoundHeaderStyles'
interface RoundHeaderProps {
    showLeft: boolean,
    showRight: boolean,
    roundNumber: number,
    onLeftPress: () => void,
    onRightPress: () => void
}

export default class RoundHeader extends React.Component<RoundHeaderProps, any> {
    render() {
        return (
            <View style={headerStyles.main}>
                <TouchableOpacity
                    onPress={this.props.onLeftPress}
                    disabled={!this.props.showLeft}
                    style={[headerStyles.leftArrowButton, headerStyles.bothArrowButtons]}>
                    { this.props.showLeft && <Image source={Images.leftArrow} /> }
                </TouchableOpacity>
                <Text style={headerStyles.text}>{`Round ${this.props.roundNumber || 1}`}</Text>
                <TouchableOpacity
                    onPress={this.props.onRightPress}
                    disabled={!this.props.showRight}
                    style={[headerStyles.rightArrowButton, headerStyles.bothArrowButtons]}>
                    { this.props.showRight && <Image source={Images.rightArrow} />}
                </TouchableOpacity>
            </View>
        )
    }
}