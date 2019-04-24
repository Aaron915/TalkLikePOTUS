import {
    getSelectedGame,
    getGameOpponentFirstName,
    getGameOpponentProfilePicture,
    getGameIsAvailable,
    getGameUserCanForceForfeitOpponent,
    getGameForfeited,
    getGameIsOpen
} from './../../../../selectors/gameSelectors'
import {
    getUserWonRound,
    getUserCanPlayRound,
    getUserSplitupText,
    getOpponentScoreForRound,
    getHideOpponentText,
    getWaitingForOpponent,
    getOpponentWonRound,
    getUserWinsUpToRound,
    getOpponentWinsUpToRound
} from './../../../../selectors/roundSelectors'
import { getUserProfilePicture, getUserFullName } from './../../../../selectors/dataSelectors'
import { TurnsDetailProps } from './components/TurnsDetail/TurnsDetail'
import { Game, User } from './../../../../types/models'
import { State } from './../../../../types/state'
import { createSelector, createStructuredSelector } from 'reselect'
import { RoundDetailProps, RoundDetailHeader, RoundDetailRequiredWords, RoundDetailGameOverview, ForfeitButtonProps } from './RoundDetail'
import { getUser } from '../../../../selectors/dataSelectors'
import { getRoundNumber, getRoundRequiredWords, getUserScoreForRound, getOpponentSplitupText } from '../../../../selectors/roundSelectors'

const getRoundHeaderProps: (state: State, props: RoundDetailProps) => RoundDetailHeader = createSelector(
    getSelectedGame,
    getRoundNumber,
    (game?: Game, roundNumber?: number) => {

        let showLeftArrow
        let showRightArrow
        let roundNumberToDisplay

        if (!game) {
            showLeftArrow = false
            showRightArrow = false
            roundNumber = 1
        } else {
            showLeftArrow = roundNumber !== 1
            showRightArrow = roundNumber < game.rounds.length
            roundNumberToDisplay = roundNumber
        }

        return {
            showLeftArrow,
            showRightArrow,
            roundNumber: roundNumberToDisplay
        }
    }
)

const getShowForfeit: (state: State, props: RoundDetailProps) => boolean = createSelector(
    getSelectedGame,
    getRoundHeaderProps,
    getGameForfeited,
    getGameIsOpen,
    (game: Game, roundHeaderProps: RoundDetailHeader, forfeited: boolean, gameOpen: boolean) => {
        if (!game) {
            return false
        }
        return roundHeaderProps.showRightArrow === false && !forfeited && gameOpen
    }
)

export const getRoundRequiredWordsProps: (state: State, props: RoundDetailProps) => RoundDetailRequiredWords = createSelector(
    getRoundRequiredWords,
    (words?: string[]) => {
        if (words && words.length === 2) {
            return {
                firstWord: words[0],
                secondWord: words[1]
            }
        }

        return {}
    }
)

const getRoundGameOverViewProps: (state: State, props: RoundDetailProps) => RoundDetailGameOverview = createSelector(
    getUser,
    getSelectedGame,
    getRoundNumber,
    getUserWinsUpToRound,
    getOpponentWinsUpToRound,
    (user: User, currentGame: Game, _roundNumber: number, userWins: number, opponentWins: number) => {
        if (!currentGame) {
            return {}
        }

        return {
            userProfilePicture: user.profilePicture,
            userFirstName: user.firstName,
            userRoundsWon: userWins,
            opponentProfilePicture: currentGame.opponent.profilePicture,
            opponentFirstName: currentGame.opponent.firstName,
            opponentRoundsWon: opponentWins
        }
    }
)

const getForfeitButtonProps: (state: State, props: RoundDetailProps) => ForfeitButtonProps = createSelector(
    getGameOpponentFirstName,
    getGameUserCanForceForfeitOpponent,
    (firstName: string, canForfeit: boolean) => {
        return {
            opponentName: firstName,
            forfeitUser: !canForfeit
        }
    }
)

export const getTurnDetailProps: (state: State, props: RoundDetailProps) => TurnsDetailProps = createStructuredSelector({
    userProfilePicture: getUserProfilePicture,
    userFullName: getUserFullName,
    userScore: getUserScoreForRound,
    userText: getUserSplitupText,
    userWonRound: getUserWonRound,
    userCanPlay: getUserCanPlayRound,
    opponentProfilePicture: getGameOpponentProfilePicture,
    opponentFullName: getGameOpponentFirstName,
    opponentText: getOpponentSplitupText,
    opponentScore: getOpponentScoreForRound,
    opponentWonRound: getOpponentWonRound,
    hideOpponentText: getHideOpponentText,
    waitingForOpponent: getWaitingForOpponent,
    roundRequiredWords: getRoundRequiredWords
})

export const getRoundDetailProps: (state: State, props: RoundDetailProps) => any = createStructuredSelector({
    header: getRoundHeaderProps,
    requiredWords: getRoundRequiredWordsProps,
    gameOverview: getRoundGameOverViewProps,
    turnsDetail: getTurnDetailProps,
    gameAvailable: getGameIsAvailable,
    showForfeit: getShowForfeit,
    forfeitButton: getForfeitButtonProps
})