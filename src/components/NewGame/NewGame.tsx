import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { newGameStyles } from './NewGameStyles'
import { standardStyles }  from '../../styles/sharedStyles'
import NewGameButton from './NewGameButton/NewGameButton'
import Images from '../../shared/Images'
interface NewGameProps {
    showFriends: boolean,
    onFriendsPressed?: () => void,
    onUsernamePressed: () => void,
    onRandomPressed: () => void
}

export default class NewGame extends React.Component<NewGameProps, any> {
    render() {
        return (
            <View style={[newGameStyles.mainContainer, standardStyles.standardCell]}>
                <Text style={newGameStyles.newGameText}>New Game</Text>
                <View style={newGameStyles.buttonsContainer}>
                    {this._renderFBButtonIfNeeded()}
                    {this._renderFBSeperator()}
                    {this._renderUsernameButton()}
                    <View style={standardStyles.thinItemSeperator} />
                    {this._renderRandomButton()}
                </View>
            </View>
        )
    }

    _renderFBButtonIfNeeded() {
        if (this.props.showFriends) {
            return (
                <NewGameButton
                image={Images.facebookIcon26}
                onPress={this.props.onFriendsPressed}
                title={'Friend'}/>
            )
        }

        return undefined
    }
    _renderFBSeperator() {
        if (this.props.showFriends) {
            return (
                <View style={standardStyles.thinItemSeperator} />
            )
        }

        return undefined
    }

    _renderUsernameButton() {
        return (
            <NewGameButton
            image={Images.trumpBlueIcon17}
            onPress={this.props.onUsernamePressed}
            title={'Username'}/>
        )
    }

    _renderRandomButton() {
        return (
            <NewGameButton
            image={Images.questionMark}
            onPress={this.props.onRandomPressed}
            title={'Random'}/>
        )
    }
}