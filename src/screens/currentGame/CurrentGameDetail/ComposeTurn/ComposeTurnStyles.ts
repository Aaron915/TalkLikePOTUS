import { main, main20, secondary, standardGreen } from './../../../../constants/colors'
import { StyleSheet } from 'react-native'
import { isIPhoneX } from '../../../../utils/deviceUtils'

const sharedSubmitButtonStyle = {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 7.5
}

const requiredWordsShared = {

}

const requiredWordsTop = {
    marginBottom: 5
}

const standardText = {
    fontSize: 18
}

let paddingTop = 31
if (isIPhoneX()) {
    paddingTop += 10
}

export const composeTurnStyles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1
    },
    contentView: {
        paddingTop: paddingTop,
        padding: 11,
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 11
    },
    submitButton: {
        ...sharedSubmitButtonStyle,
        backgroundColor: main
    },
    submitButtonDisabled: {
        ...sharedSubmitButtonStyle,
        backgroundColor: main20
    },
    standardRequiredText: {
        fontSize: 16,
        fontWeight: '800'
    },
    notIncludedText: {
        color: secondary
    },
    includedText: {
        color: standardGreen
    },
    characterCount: {
        fontWeight: '700',
        fontSize: 18
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    requiredWordsContainer: {
        alignItems: 'flex-end'
    },
    requiredWordBottom: {
        ...requiredWordsShared
    },
    requiredWordTop: {
        ...requiredWordsShared,
        ...requiredWordsTop
    },
    standardText,
    boldedText: {
        ...standardText,
        fontWeight: 'bold'
    },
    whiteText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
})