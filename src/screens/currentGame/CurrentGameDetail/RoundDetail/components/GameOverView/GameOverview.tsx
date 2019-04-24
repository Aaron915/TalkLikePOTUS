import React from 'react'
import {
    View, Image, Text
} from 'react-native'
import { gameOverviewStyles } from './GameOverviewStyles'
import { standardStyles } from '../../../../../../styles/sharedStyles'
import Trophys from '../../../../../../components/Trophys/Trophys'
export interface GameOverviewProps {
    userName: string,
    userPorfilePicture: string,
    userRoundsWon: number,
    opponentProfilePicture: string,
    opponentName: string,
    opponentRoundsWon: number
}

export default class GameOverview extends React.Component<GameOverviewProps, any> {
    render() {
        return (
            <View style={[gameOverviewStyles.main, standardStyles.standardCell]}>
                <View style={gameOverviewStyles.container}>
                    {this._renderUserSide()}
                    {this._renderOpponentSide()}
                </View>
            </View>
        )
    }

    _renderUserSide() {
        return (
            <View style={{ flex: 1 }}>
                <View style={gameOverviewStyles.userContainer}>
                    <View>
                        <Image
                            style={standardStyles.standardSizedProfilePic}
                            source={{ uri: this.props.userPorfilePicture }} />
                    </View>
                    <View style={gameOverviewStyles.contentSeperator} />
                    <View>
                        <Text style={gameOverviewStyles.nameText}>{this.props.userName || ''}</Text>
                        {this._renderTrophies(this.props.userRoundsWon, false)}
                    </View>
                </View>
            </View>
        )
    }

    _renderOpponentSide() {
        return (
            <View style={{ flex: 1 }}>
                <View style={gameOverviewStyles.opponentContainer}>
                    <View style={gameOverviewStyles.rightContainer}>
                        <Text style={gameOverviewStyles.nameText}>{this.props.opponentName || ''}</Text>
                        {this._renderTrophies(this.props.opponentRoundsWon, true)}
                    </View>
                    <View style={gameOverviewStyles.contentSeperator} />
                    <View>
                        <Image
                            source={{ uri: this.props.opponentProfilePicture }}
                            style={standardStyles.standardSizedProfilePic} />
                    </View>
                </View>
            </View>
        )
    }

    _renderTrophies(numberOfTrophies: number, reversed: boolean = false) {
        return (
            <Trophys numberOfTrophies={numberOfTrophies} reversed={reversed} />
        )
    }
}
