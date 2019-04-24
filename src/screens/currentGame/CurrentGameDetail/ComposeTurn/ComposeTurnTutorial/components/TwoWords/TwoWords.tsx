import React from 'react'
import {
    Text,
    View
} from 'react-native'
import TutorialContainer from '../../../../../../../components/TutorialContainer/TutorialContainer'
import { ChildLeftAndRightActions } from '../../ComposeTurnTutorial'
import { twoWordsStyles } from './TwoWordsStyles'

interface TwoWordsProps extends ChildLeftAndRightActions {
}

export default class TwoWords extends React.Component<TwoWordsProps, any> {

    render() {
        return (
            <TutorialContainer
                mainText={`We'll give you two words or phrases like...`}
                hideLeftArrow={true}
                onRight={this.props.onRightPressed}
                width={this.props.width}>
                <View style={{flex: 1, paddingTop: 10}}>
                    <Text style={[twoWordsStyles.text]}>
                        <Text style={[twoWordsStyles.text, twoWordsStyles.selectedWords]}>{`Collusion\n`}</Text>
                        <Text style={[twoWordsStyles.text]}>{`and\n`}</Text>
                        <Text style={[twoWordsStyles.text, twoWordsStyles.selectedWords]}>Nothing to see here</Text>
                    </Text>
                </View>
            </TutorialContainer>
        )
    }
}