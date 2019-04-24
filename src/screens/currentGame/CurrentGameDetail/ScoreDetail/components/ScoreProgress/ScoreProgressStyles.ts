import { StyleSheet } from 'react-native'

// Spacing betweeb the users profile picture and the triangle indicator below.
export const triangleTopMargin = 5.5
// Spacing between the progress bar and the user icons above.
export const scoreProgressSpacing = 2.75

export const scoreProgressStyles = StyleSheet.create({
    progressBar: {
        width: undefined,
        marginHorizontal: 17
    },
    userIconsContainer: {
        flexDirection: 'row'
    },
    userScoreIndicator: {
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'flex-end'
    },
    userScoreIndicatorTriangle: {
        marginTop: triangleTopMargin
    }
})