import React from 'react'
import TutorialContainer from '../../../../../../../components/TutorialContainer/TutorialContainer'
import { ChildLeftAndRightActions } from '../../ComposeTurnTutorial'
import BoldedText from '../../../../../../../components/BoldedText/BoldedText'
import { composeMessageStyles } from './ComposeMessageStyles'
interface ComposeMessageProps extends ChildLeftAndRightActions {
}

interface ComposeMessageState {
}

export default class ComposeMessage extends React.Component<ComposeMessageProps, ComposeMessageState> {

    render() {
        return (
            <TutorialContainer
                mainText={'You then compose a message with those words as though you are POTUS. Try your best to mimic his idiolect.'}
                onLeft={this.props.onLeftPressed}
                width={this.props.width}
                onRight={this.props.onRightPressed}>
                <BoldedText
                    alignToCenter={true}
                    standardTextStyle={composeMessageStyles.messageText}
                    boldedTextStyle={composeMessageStyles.boldedMessageText}
                    texts={this._exampleMessage()}
                    boldedPhrases={this._boldedWords()} />
            </TutorialContainer>
        )
    }

    _exampleMessage(): string[] {
        return [
            'The fake news media continues to say that there was ',
            'collusion',
            `, but there's `,
            'nothing to see here',
            '! We will create JOBS!'
        ]
    }

    _boldedWords(): string[] {
        return [
            'collusion',
            'nothing to see here'
        ]
    }
}