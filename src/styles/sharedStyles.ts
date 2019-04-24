import { seperatorGrey, borderGrey } from './../constants/colors'
import { StyleSheet } from 'react-native'

const profilePicHeight = 34
export const standardStyles = StyleSheet.create({
    standardCell: {
        backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: borderGrey
    },
    thinItemSeperator: {
        borderRadius: 2,
        width: 2,
        backgroundColor: seperatorGrey
    },
    horizintalSeperatorThin: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: borderGrey
    },
    standardSizedProfilePic: {
        borderRadius: profilePicHeight / 2,
        height: profilePicHeight,
        width: profilePicHeight
    },
    seperatorView: {
        height: 11
    }
})