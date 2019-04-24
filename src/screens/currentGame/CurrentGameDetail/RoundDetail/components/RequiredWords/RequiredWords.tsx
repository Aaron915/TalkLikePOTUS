import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { requiredWordsStyles } from './RequiredWordsStyle'
import { standardStyles } from '../../../../../../styles/sharedStyles'
interface RequiredWordsProps {
    firstWord?: string,
    secondWord?: string
}

export default class RequiredWords extends React.Component<RequiredWordsProps, any> {
    render() {
        return (
            <View style={[requiredWordsStyles.main, standardStyles.standardCell]}>
                <Text style={requiredWordsStyles.requiredText}>{'Required Words/Phrases'}</Text>
                <View style={requiredWordsStyles.wordsContainer}>
                    <Text style={requiredWordsStyles.wordTop}>{this.props.firstWord || ''}</Text>
                    <Text style={requiredWordsStyles.word}>{this.props.secondWord || ''}</Text>
                </View>
            </View>
        )

    }
}