import {
    Alert
} from 'react-native'

export function errorAlert(message: string, onRetry?: () => void): void {

    let buttons = []
    if (onRetry) {
        const retry = {
            title: 'Retry',
            onPress: onRetry
        }
        buttons.push(retry)
    }

    Alert.alert('Error', message, buttons)
}

export function alert(message: string, title: string) {
    Alert.alert(message, title)
}

export function alertWithActionAndCancel(title: string, message: string, actionTitle: string, action: () => void) {
    let buttons = []

    buttons.push({text: 'Cancel'})
    buttons.push({
        text: actionTitle,
        onPress: action
    })

    Alert.alert(title, message, buttons)
}