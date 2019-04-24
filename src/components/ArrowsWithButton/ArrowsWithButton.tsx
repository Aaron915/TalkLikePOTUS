import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import Images from '../../shared/Images'
import { arrowsWithButtonStyles } from './ArrowsWithButtonStyle'

export interface ArrowWithButtonsProps {
    style?: any
    hideLeftArrow?: boolean
    hideRightArrow?: boolean
    onLeft?: () => void
    onRight?: () => void
    centerButtonProps?: ArrowWithButtonsCenterButtonProps
}

interface ArrowWithButtonsState {
}

export interface ArrowWithButtonsCenterButtonProps {
    title: string,
    onPress: () => void
}

export default class ArrowWithButtons extends React.Component<ArrowWithButtonsProps, ArrowWithButtonsState> {

    render() {
        return (
            <View style={[arrowsWithButtonStyles.main, this.props.style]}>
                <TouchableOpacity
                    style={[arrowsWithButtonStyles.containers, arrowsWithButtonStyles.leftContainer]}
                    onPress={this.props.onLeft}
                    disabled={this.props.hideLeftArrow}>
                    {!this.props.hideLeftArrow && <Image source={Images.blueLeftArrow} />}
                </TouchableOpacity>
                <View
                    style={[arrowsWithButtonStyles.containers, arrowsWithButtonStyles.centerContainer]}>
                    {this._renderCenterButton()}
                </View>
                <TouchableOpacity
                    style={[arrowsWithButtonStyles.containers, arrowsWithButtonStyles.rightContainer]}
                    disabled={this.props.hideRightArrow}
                    onPress={this.props.onRight}>
                    {!this.props.hideRightArrow && <Image source={Images.blueRightArrow} />}
                </TouchableOpacity>
            </View>
        )
    }

    _renderCenterButton() {
        if (this.props.centerButtonProps) {
            return (
                <TouchableOpacity
                style={arrowsWithButtonStyles.centerButton}
                onPress={this.props.centerButtonProps.onPress}>
                    <Text style={arrowsWithButtonStyles.centerButtonText}>{this.props.centerButtonProps.title}</Text>
                </TouchableOpacity>
            )
        }

        return undefined
    }
}