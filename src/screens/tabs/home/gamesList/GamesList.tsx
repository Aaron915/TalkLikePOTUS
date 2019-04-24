import React, { Component } from 'react'
import {
    View,
    Modal
} from 'react-native'
import { connect } from 'react-redux'
import {
    SectionList, RefreshControl
} from 'react-native'
import GameSummary from './Components/GameSummary/GameSummary'
import { Game } from '../../../../types/models'
import { State } from '../../../../types/state'
import { getOpenGames, getCompletedGames, getIsFetchingGames, getHasNextGameParams } from '../../../../selectors/gamesListSelectors'
import { fetchGames, declineGame } from '../../../../actions/gamesListActions'
import { gamesListStyles } from './GamesListStyles'
import { setCurrentGameID } from '../../../../actions/currentGameActions'
import { hasSeenNotificationPrompt } from '../../../../actions/featurePromptActions'
import { getHasSeenPushNotificationPrompt } from '../../../../selectors/featurePromptSelectors'
import { PushNotificationPrompt } from './Components/PushNotificationPrompt/PushNotificationPrompt'
import { getIsAuthenticated } from '../../../../selectors/authSelectors'
import * as PushNotification from 'react-native-push-notification'
import { startGameWithUsername, startRandomGame, startGameWithUser, retrieveCurrentGame } from '../../../../actions/currentGameActions'
import NewGame from '../../../../components/NewGame/NewGame'
import EnterOpponentUsername from '../../../shared/EnterOpponentUsername/EnterOpponentUsername'
import { setPushNotificationId } from '../../../../actions/pushNotificationActions'
import { getUserUserName } from '../../../../selectors/dataSelectors'

interface GamesListProps {
    declineGame: (gameId: string) => void,
    startGameWithUser: (userId: string) => void,
    startGameWithUserName: (username: string) => void,
    goToFriends: () => void
    startRandomGame: () => void,
    openGames?: Game[],
    completedGames?: Game[],
    isFetchingGames: boolean,
    fetchNewGames?: () => void,
    fetchMoreGames: () => void,
    openGame?: (gameID: string) => void,
    showNotificationsPrompt: boolean,
    hasSeenNotificationPrompt: () => void
    navigation: any,
    showNewGame: boolean,
    updatePushNotificationID: (token: string) => void,
    retrieveCurrentGame: (gameId: string) => void
}

interface GamesListState {
    isRefreshing: boolean,
    contentHeight?: number,
    viewHeight?: number,
    showNotificationPrompt: boolean,
    showEnterUserName: boolean
}

class GamesList extends Component<GamesListProps, GamesListState> {
    constructor(props) {
        super(props)
        this.state = {
            showNotificationPrompt: false,
            isRefreshing: false,
            showEnterUserName: false
        }
        this._setupPushNotifications()
    }

    componentWillReceiveProps(props) {
        if (this.state.isRefreshing && !props.isFetchingGames) {
            this.setState({
                isRefreshing: false
            })
        }
        this._openPushNotificationPromptIfNeeded(props)
    }

    render() {
        return (
            <View style={gamesListStyles.main} onLayout={this._onViewLayout.bind(this)}>
                <SectionList
                    contentContainerStyle={{ paddingBottom: 12 }}
                    scrollEventThrottle={200}
                    style={gamesListStyles.sectionList}
                    onContentSizeChange={this._onContentSizeChange.bind(this)}
                    onScroll={this._onScroll.bind(this)}
                    ItemSeparatorComponent={this._renderCellSeperator.bind(this)}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={_section => <View style={gamesListStyles.cellSeperator} />}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh.bind(this)} />
                    }
                    sections={this._buildSections()} />
                <Modal
                    animationType={'fade'}
                    visible={this.state.showNotificationPrompt}
                    transparent={true}>
                    <PushNotificationPrompt
                        onDismissPressed={this._dismissPushNotificationPrompt.bind(this)}
                        onAcceptPressed={this._acceptNotificiations.bind(this)} />
                </Modal>
                <EnterOpponentUsername
                    onUserDismiss={this._dismissEnterUsername.bind(this)}
                    show={this.state.showEnterUserName}
                    onUsernameSelected={this._usernameSelected.bind(this)} />
            </View>
        )
    }

    _renderCellSeperator() {
        return (
            <View style={gamesListStyles.cellSeperator} />
        )
    }

    _renderGameSummary(item: any) {
        return (
            <GameSummary
                onPlayAgainTapped={this._onPlayOpponentGamePressed.bind(this)}
                _id={item.id}
                key={item.key}
                onSummaryTapped={item.onSummaryTapped}
                onDeclineGameTapped={item.onDeclinePressed} />
        )
    }

    _buildSections(): any {
        const sections = [this._buildGamesSection(this.props.openGames)]
        if (this.props.showNewGame) {
            sections.push(this._buildNewGameSection())
        }
        if (this.props.completedGames.length > 0) {
            sections.push(this._buildGamesSection(this.props.completedGames))
        }
        return sections
    }

    _buildNewGameSection() {
        return {
            data: [
                {
                    showFriends: true,
                    onFriendsPressed: this.props.goToFriends,
                    onUsernamePressed: this._usernamePressed.bind(this),
                    onRandomPressed: this.props.startRandomGame,
                    key: 'new_game'
                }
            ],
            renderItem: ({ item }) => {
                return (
                    <NewGame
                        showFriends={item.showFriends}
                        onUsernamePressed={item.onUsernamePressed}
                        onRandomPressed={item.onRandomPressed}
                        onFriendsPressed={item.onFriendsPressed} />
                )
            }
        }
    }

    _buildGamesSection(games: Game[]) {
        const data = this._convertGameListToData(games)
        return {
            data,
            renderItem: ({ item }) => {
                return this._renderGameSummary(item)
            }
        }
    }

    _convertGameListToData(games: Game[]): any[] {
        if (!games) {
            return []
        }
        return games.map((game: Game) => {
            return {
                id: game._id,
                key: game._id,
                onSummaryTapped: this._onSummaryTapped.bind(this),
                onDeclinePressed: this._onDeclineGamePressed.bind(this)
            }
        })
    }

    _onContentSizeChange(_width: number, height: number) {
        this.setState({
            contentHeight: height
        })
    }

    _onScroll({ nativeEvent: { contentOffset } }) {
        if (!this.state.contentHeight || !this.state.viewHeight) {
            return
        }

        const offset = contentOffset.y

        if (offset >= this.state.contentHeight - this.state.viewHeight && !this.props.isFetchingGames && !this.state.isRefreshing) {
            this.props.fetchMoreGames()
        }
    }

    _onViewLayout({ nativeEvent: { layout } }) {
        this.setState({
            viewHeight: layout.height
        })
    }

    _onDeclineGamePressed(_id: string) {
        this.props.declineGame(_id)
    }
    _onSummaryTapped(_id: string) {
        this.props.openGame(_id)
    }
    _onRefresh() {
        this.setState({
            isRefreshing: true
        })
        this.props.fetchNewGames()
    }

    _openPushNotificationPromptIfNeeded(props: GamesListProps) {
        if (props.showNotificationsPrompt) {
            this.setState({
                showNotificationPrompt: true
            })
            this.props.hasSeenNotificationPrompt()
        }
    }

    _dismissPushNotificationPrompt() {
        this.setState({
            showNotificationPrompt: false
        })
    }

    _acceptNotificiations() {
        this.setState({
            showNotificationPrompt: false
        })
        PushNotification.requestPermissions()
    }

    _usernamePressed() {
        this.setState({
            showEnterUserName: true
        })
    }

    _usernameSelected(username: string) {
        this.props.startGameWithUserName(username)
        this._dismissEnterUsername()
    }

    _dismissEnterUsername() {
        this.setState({
            showEnterUserName: false
        })
    }

    _onPlayOpponentGamePressed(opponentID: string) {
        this.props.startGameWithUser(opponentID)
    }

    _setupPushNotifications() {
        PushNotification.configure({
            onRegister: this._onRegister.bind(this),
            onNotification: this._handleNotification.bind(this),
            requestPermissions: false,
            senderID: '543598745271'
        })
    }

    _onRegister(tokenInfo: any) {
        if (tokenInfo.token) {
            this.props.updatePushNotificationID(tokenInfo.token)
        } else {
            console.warn('no token received')
        }
    }

    _handleNotification(notification) {
        const gameId = notification && notification.data && notification.data.gameId
        if (!notification.foreground && notification.userInteraction) {
            this.props.retrieveCurrentGame(gameId)
            this.props.navigation.navigate('CurrentGameDetail')
        }
    }
}

function mapDispatchToProps(dispatch, props): Partial<GamesListProps> {
    return {
        fetchMoreGames: () => { dispatch(fetchGames()) },
        fetchNewGames: () => { dispatch(fetchGames(true)) },
        openGame: (gameID: string) => {
            dispatch(setCurrentGameID(gameID))
            props.navigation.navigate('CurrentGameDetail')
        },
        hasSeenNotificationPrompt: () => { dispatch(hasSeenNotificationPrompt()) },
        startGameWithUserName: (username: string) => {
            dispatch(startGameWithUsername(username))
            props.navigation.navigate('CurrentGameDetail')
        },
        startRandomGame: () => {
            dispatch(startRandomGame())
            props.navigation.navigate('CurrentGameDetail')
        },
        goToFriends: () => {
            props.navigation.navigate('Friends')
        },
        startGameWithUser: (userID: string) => {
            dispatch(startGameWithUser(userID))
            props.navigation.navigate('CurrentGameDetail')
        },
        declineGame: (gameId: string) => {
            dispatch(declineGame(gameId))
        },
        updatePushNotificationID: (token: string) => {
            dispatch(setPushNotificationId(token))
        },
        retrieveCurrentGame: (gameId: string) => {
            dispatch(retrieveCurrentGame(gameId))
        }
    }
}

function mapStateToProps(state: State): Partial<GamesListProps> {
    const hasBeenShownNotifications = getHasSeenPushNotificationPrompt(state)
    const completedGames = getCompletedGames(state)
    const isAuthenticated = getIsAuthenticated(state)
    const showNewGame = !getHasNextGameParams(state) || completedGames.length > 0
    const hasUserName = getUserUserName(state) !== undefined
    return {
        openGames: getOpenGames(state),
        completedGames,
        isFetchingGames: getIsFetchingGames(state),
        showNotificationsPrompt: !hasBeenShownNotifications && isAuthenticated && hasUserName,
        showNewGame
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)