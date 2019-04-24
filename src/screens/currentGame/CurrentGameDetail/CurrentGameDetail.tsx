import * as React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { currentGameDetailStyles } from './CurrentGameDetailStyles'
import RoundDetail from './RoundDetail/RoundDetail'
import { getStartGameError, getCurrentGameStartErrorBadUserName, getWaitingForRandomOpponent } from '../../../selectors/currentGameSelectors'
import { State } from '../../../types/state'
import { errorAlert, alert } from '../../../utils/shared/Alerts'
import * as componentSelectors from './CurrentGameSelectors'
import { resetCurrentGame } from '../../../actions/currentGameActions'

interface CurrentGameDetailProps {
    roundData?: any[],
    // True if an error occured starting game.
    startGameError?: boolean,
    waitingForOpponent?: boolean,
    userNameError?: boolean,
    goBack: () => void,
    navigation: any,
    resetCurrentGameState: () => void
}
interface CurrentGameDetailsState {
    width?: number
}

class CurrentGameDetail extends React.Component<CurrentGameDetailProps, CurrentGameDetailsState> {

    list: any

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(props: CurrentGameDetailProps) {
        if (props.waitingForOpponent && !this.props.waitingForOpponent) {
            this.props.goBack()
            this._showWaitingForOpponentAlert()
        } else if (props.userNameError && !this.props.userNameError) {
            this.props.goBack()
            this._showError('User with that Username could not be found.')
        } else if (props.startGameError && !this.props.startGameError) {
            this.props.goBack()
            this._showError(`Something went wrong starting a new game. Make sure you are connected to the internet.`)
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.list.scrollToIndex({
                animated: false,
                index: this.props.roundData.length - 1,
                viewOffset: 0,
                viewPosition: 0
            })
        }, 200)
    }

    componentWillUnmount() {
        this.props.resetCurrentGameState()
    }

    render() {
        return (
            <FlatList
                ref={ref => (this.list = ref)}
                keyboardShouldPersistTaps = 'always'
                pagingEnabled={true}
                onLayout={this._listLayout.bind(this)}
                style={currentGameDetailStyles.main}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.props.roundData}
                renderItem={this._renderRoundDetail.bind(this)} />
        )
    }

    _showError(text: string) {
        errorAlert(text)
    }

    _showWaitingForOpponentAlert() {
        alert('Looking for opponent...', 'Once an opponent is found, a new game will be added to your games list.')
    }

    _listLayout({ nativeEvent: { layout } }) {
        this.setState({
            width: layout.width
        })
    }

    _renderRoundDetail({ item }) {
        return (
            <RoundDetail
                onLeftButtonPressed={this._onLeftButtonPressed.bind(this)}
                onRightButtonPressed={this._onRightButtonPressed.bind(this)}
                roundNumber={item.round}
                width={this.state.width}
                navigation={this.props.navigation} />
        )
    }

    _onLeftButtonPressed(idx: number) {
        this.list.scrollToIndex({
            animated: true,
            index: idx - 1,
            viewOffset: 0,
            viewPosition: 0
        })
    }

    _onRightButtonPressed(idx: number) {
        this.list.scrollToIndex({
            animated: true,
            index: idx + 1,
            viewOffset: 0,
            viewPosition: 0
        })
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        goBack: () => { ownProps.navigation.goBack() },
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetCurrentGameState: () => {dispatch(resetCurrentGame())}
    }
}

function mapStateToProps(state: State) {
    return {
        waitingForOpponent: getWaitingForRandomOpponent(state),
        userNameError: getCurrentGameStartErrorBadUserName(state),
        startGameError: getStartGameError(state),
        roundData: componentSelectors.getCurrentGameDetailData(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CurrentGameDetail)