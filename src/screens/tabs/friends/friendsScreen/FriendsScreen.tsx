import React from 'react'
import { connect } from 'react-redux'
import {
    View, SectionList
} from 'react-native'
import friendsScreenStyles from './FriendsScreenStyles'
import NewGame from '../../../../components/NewGame/NewGame'
import { getFriendsSectionData } from '../../../../selectors/friendsSelectors'
import { State } from '../../../../types/state'
import FriendCell from './FriendCell/FriendCell'
import { getBearerToken } from '../../../../selectors/authSelectors'
import EnterOpponentUsername from '../../../shared/EnterOpponentUsername/EnterOpponentUsername'
import { alertWithActionAndCancel } from '../../../../utils/shared/Alerts'
import { startGameWithFriend, startGameWithUsername, startRandomGame } from '../../../../actions/currentGameActions'
import { getNextFriends } from '../../../../actions/friendsActions'
interface FriendsScreenProps {
    startGameWithUserName: (username: string) => void,
    startGameWithFacebookID: (facebookID: string) => void,
    startRandomGame: () => void,
    fetchNextFriends: () => void,
    isAuthenticated: boolean,
    friendsSectionData: any[],
    navigation: any
}

interface FriendsScreenState {
    showEnterUsername: boolean,
    contentHeight: number,
    viewHeight: number
}

class FriendsScreen extends React.Component<FriendsScreenProps, FriendsScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            showEnterUsername: false,
            contentHeight: 0,
            viewHeight: 0
        }
    }

    render() {
        return (
            <View
                onLayout={this._onViewLayout.bind(this)}
                style={friendsScreenStyles.mainContainer}>
                <SectionList
                    onContentSizeChange={this._onContentSizeChange.bind(this)}
                    scrollEventThrottle={200}
                    onScroll={this._onScroll.bind(this)}
                    ItemSeparatorComponent={this._renderFriendsSeperator.bind(this)}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={_section => <View style={friendsScreenStyles.sectionSeperator} />}
                    style={friendsScreenStyles.sectionList}
                    sections={[this._firstSectionInfo(), this._friendsSectionData()]}
                />
                <EnterOpponentUsername
                    onUserDismiss={this._userWantsToDismissUserNameEntry.bind(this)}
                    show={this.state.showEnterUsername}
                    onUsernameSelected={this._choseOpponentUsername.bind(this)}
                />
            </View>
        )
    }

    _firstSectionInfo() {
        return {
            data: [
                {
                    showFriends: false,
                    onUsernamePressed: this._usernamePressed.bind(this),
                    onRandomPressed: this._randomOpponentPressed.bind(this),
                    key: 'new_game'
                }
            ],
            renderItem: ({ item }) => {
                return (
                    <NewGame
                        showFriends={item.showFriends}
                        onUsernamePressed={item.onUsernamePressed}
                        onRandomPressed={item.onRandomPressed}
                    />
                )
            }
        }
    }

    _renderFriendsSeperator() {
        return (
            <View style={friendsScreenStyles.friendSectionItemSeperator} />
        )
    }

    _friendsSectionData() {
        return {
            data: this.props.friendsSectionData,
            renderItem: ({ item }) => {
                return (
                    <FriendCell
                        name={item.name}
                        imageUrl={item.imageUrl}
                        id={item.key}
                        onPress={this._friendSelected.bind(this)} />
                )
            }
        }
    }

    _usernamePressed() {
        this.setState({
            showEnterUsername: true
        })
    }

    _userWantsToDismissUserNameEntry() {
        this.setState({
            showEnterUsername: false
        })
    }

    _randomOpponentPressed() {
        this.props.startRandomGame()
    }

    _friendSelected(id: string) {
        const chosenFriend = this.props.friendsSectionData.find(friend => friend.key === id)
        const message = `Start a new game with ${chosenFriend.name}?`
        const title = 'New Game'
        const actionTitle = 'Continue'

        alertWithActionAndCancel(title, message, actionTitle, () => {
            this.props.startGameWithFacebookID(id)
        })
    }

    _choseOpponentUsername(username: string) {
        this.setState({
            showEnterUsername: false
        })
        this.props.startGameWithUserName(username)
    }

    _onContentSizeChange(_width: number, height: number) {
        this.setState({
            contentHeight: height
        })
    }

    _onViewLayout({ nativeEvent: { layout } }) {
        this.setState({
            viewHeight: layout.height
        })
    }

    _onScroll({ nativeEvent: { contentOffset } }) {
        if (!this.state.contentHeight || !this.state.viewHeight) {
            return
        }

        const offset = contentOffset.y

        if (offset >= this.state.contentHeight - this.state.viewHeight) {
            this.props.fetchNextFriends()
        }
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        startGameWithFacebookID: (facebookID: string) => {
            dispatch(startGameWithFriend(facebookID))
            props.navigation.navigate('CurrentGameDetail')
        },
        startGameWithUserName: (username: string) => {
            dispatch(startGameWithUsername(username))
            props.navigation.navigate('CurrentGameDetail')
        },
        startRandomGame: () => {
            dispatch(startRandomGame())
            props.navigation.navigate('CurrentGameDetail')
        },
        fetchNextFriends: () => {
            dispatch(getNextFriends())
        }
    }
}

function mapStateToProps(state: State) {
    const friendsSectionData = getFriendsSectionData(state)
    const isAuthenticated = getBearerToken(state) !== undefined
    return {
        friendsSectionData,
        isAuthenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)
