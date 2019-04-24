import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './store/configuredStore'
import MainNavigation from './screens/navigation/MainNavigation'
import firebase from 'react-native-firebase'
// Ignores the warning that the chrome debugger is in a bakground thread.
// Ignores warnings about layout animations becuase they all share the same state.
console.ignoredYellowBox = ['Remote debugger is in a background', 'Warning: Overriding previous layout animation with new one before the first began']

export default class App extends Component<any, any> {
    constructor(props) {
        super(props)
        // @ts-ignore
        firebase.admob().initialize('[REDACTED]')
    }
    render() {

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <StatusBar barStyle={'light-content'} />
                    <MainNavigation />
                </PersistGate>
            </Provider>
        )
    }
}