import React from 'react'
import {
   Image
} from 'react-native'
import TutorialsContainer from '../.././../../../../../components/TutorialContainer/TutorialContainer'
import Images from '../../../../../../../shared/Images'
import { ChildLeftAndRightActions } from '../../ComposeTurnTutorial'
import { ArrowWithButtonsCenterButtonProps } from '../../../../../../../components/ArrowsWithButton/ArrowsWithButton'
import { scoreHigherStyles } from './ScoreHigherStyles'
interface ScoreHigherProps extends ChildLeftAndRightActions {
    onConfirmedPressed: () => void
}

interface ScoreHigherState {
}

export default class ScoreHigher extends React.Component<ScoreHigherProps, ScoreHigherState> {

    render() {
        const centerProps: ArrowWithButtonsCenterButtonProps = {
            title: 'Got it',
            onPress: this.props.onConfirmedPressed
        }
        return(
            <TutorialsContainer
                mainText={'Score higher than your opponent and you’ll win the round.  Best of 7 wins the game.'}
                centerButtonProps={centerProps}
                onLeft={this.props.onLeftPressed}
                hideRightArrow={true}
                onRight={this.props.onRightPressed}
                width={this.props.width} >
                    <Image style={scoreHigherStyles.image} source={Images.trophiesTutorial}/>
            </TutorialsContainer>
        )
    }
}