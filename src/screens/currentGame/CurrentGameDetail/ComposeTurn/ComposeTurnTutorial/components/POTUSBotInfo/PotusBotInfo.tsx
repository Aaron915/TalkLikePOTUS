import React from 'react'
import {
    Image
} from 'react-native'
import { ChildLeftAndRightActions } from '../../ComposeTurnTutorial'
import TutorialsContainer from '../.././../../../../../components/TutorialContainer/TutorialContainer'
import Images from '../../../../../../../shared/Images'
import { potusBotStyles } from './PotusBotInfoStyles'

export interface PotusBotInfoProps extends ChildLeftAndRightActions {
}

interface PotusBotInfoState {
}

export default class PotusBotInfo extends React.Component<PotusBotInfoProps, PotusBotInfoState> {

    render() {
        return (
            <TutorialsContainer
                mainText={'POTUS BOT will then score your message based on how likely it was to have come from POTUS himself.'}
                width={this.props.width}
                onLeft={this.props.onLeftPressed}
                onRight={this.props.onRightPressed} >
                <Image style={potusBotStyles.image} source={Images.potusBotLogoTutorial} />
            </TutorialsContainer>
        )
    }
}