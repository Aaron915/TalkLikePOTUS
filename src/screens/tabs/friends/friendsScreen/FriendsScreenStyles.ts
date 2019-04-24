import { StyleSheet } from 'react-native'
import { lightGreyColor } from '../../../../constants/colors'

const friendsScreenStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: lightGreyColor,
        flex: 1,
        paddingHorizontal: 12,
        alignItems: 'stretch'
    },
    sectionList: {
    },
    sectionSeperator: {
        height: 12
    },
    friendSectionItemSeperator: {
        height: 5
    }
})

export default friendsScreenStyles