import React from 'react'
import {
    Image,
    View
} from 'react-native'
import { trophyStyles } from './TrophysStyles'
import Images from '../../shared/Images'
interface TrophysProps {
    numberOfTrophies: number,
    reversed: boolean,
    style?: any
}
export default class Trophys extends React.Component<TrophysProps, any> {
    render() {
        const dummyArray = Array(this.props.numberOfTrophies).fill(1)
        const trophyStyle = this.props.reversed ? trophyStyles.reversed : trophyStyles.regular
        return (
            <View style={[trophyStyles.trophysContainer, this.props.style]}>
                {
                    dummyArray.map((_value, idx) => {
                        return (
                            <Image style={trophyStyle} source={Images.trophy} key={idx} />
                        )
                    })
                }
            </View>
        )
    }
}
