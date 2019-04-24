import { NetInfo, Platform } from 'react-native'

// Implementaion from https://github.com/facebook/react-native/issues/8615#issuecomment-287977178
export async function isConnectedToInternet() {
    if (Platform.OS === 'ios') {
        return new Promise(resolve => {
          const handleFirstConnectivityChangeIOS = isConnected => {
            NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS)
            resolve(isConnected)
          }
          NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS)
        })
      }

      return NetInfo.isConnected.fetch()
}