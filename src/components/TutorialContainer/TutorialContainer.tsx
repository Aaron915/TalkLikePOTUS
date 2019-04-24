import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { tutorialContainerStyles } from './TutorialContainerStyles'
import { standardStyles } from '../../styles/sharedStyles'
import ArrowsWithButton, { ArrowWithButtonsProps } from '../ArrowsWithButton/ArrowsWithButton'

interface TutorialContainerProps extends ArrowWithButtonsProps {
    width: number,
    mainText: string
}

export default class TutorialContainer extends React.Component<TutorialContainerProps, any> {

    render() {
        return (
            <View style={[tutorialContainerStyles.main, { width: this.props.width }]}>
                <View style={[tutorialContainerStyles.contentContainer, standardStyles.standardCell]}>
                    <Text style={tutorialContainerStyles.text}>{this.props.mainText}</Text>
                    {this.props.children}
                    <ArrowsWithButton
                        centerButtonProps={this.props.centerButtonProps}
                        hideRightArrow={this.props.hideRightArrow}
                        hideLeftArrow={this.props.hideLeftArrow}
                        onLeft={this.props.onLeft}
                        onRight={this.props.onRight}
                    />
                </View>
            </View>
        )
    }
}