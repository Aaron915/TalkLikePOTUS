import { StyleSheet } from 'react-native'
import { main } from '../../../../../../constants/colors'

export const potusBotStyles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    image: {
        marginRight: 11
    },
    textContainer: {
        justifyContent: 'flex-start'
    },
    potusTitleText: {
        color: main,
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: '900'
    },
    roundStatusStyle: {
        fontSize: 18,
        marginBottom: 11
    },
    scoreText: {
        color: main,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
