import { Dimensions, Platform } from 'react-native'

export function isIPhoneX() {
    if (Platform.OS !== 'ios') {
        return false
    }

    return Dimensions.get('window').height === 812
}

export function platformForBackend() {
    return Platform.OS === 'ios' ? 'iOS' : 'android'
}

export function isAndroid() {
    return platformForBackend() === 'android'
}