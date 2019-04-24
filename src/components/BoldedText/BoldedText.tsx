import React from 'react'
import {
    Text,
    TextInput
} from 'react-native'
import { transparent } from '../../constants/colors'
interface BoldedTextProps {
    style?: any,
    standardTextStyle: any,
    boldedTextStyle: any,
    boldedPhrases: string[],
    texts: string[],
    alignToCenter?: boolean
}

export default class BoldedText extends React.Component<BoldedTextProps, any> {
    render() {
        const alignStyle = this.props.alignToCenter ? { textAlign: 'center' } : {}
        return (
            <TextInput
                underlineColorAndroid={transparent}
                editable={false}
                multiline={true}
                style={[this.props.style, alignStyle]}>
                {
                    this.props.texts.map((text, idx) => {
                        const textLowercase = text.toLowerCase()
                        const boldedPhrasesLowercase = this.props.boldedPhrases.map(word => word.toLowerCase())
                        const style = boldedPhrasesLowercase.find(word => word === textLowercase) === undefined
                            ? this.props.standardTextStyle : this.props.boldedTextStyle
                        return <Text style={[style, alignStyle]} numberOfLines={0} key={idx}>{text}</Text>
                    })
                }
            </TextInput>
        )
    }
}