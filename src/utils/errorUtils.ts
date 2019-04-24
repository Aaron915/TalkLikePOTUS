// import firebase from 'react-native-firebase'

export function recordError(_code: number, err: any) {
    console.warn(JSON.stringify(err))
    // TODO: Fix issues with these
    // console.log(firebase)
    // console.log(firebase.fabric)
    // console.log(firebase.fabric.crashlytics)
    // const errorString = err.toString()
    // logEvent(errorString)
    // firebase.fabric.crashlytics().recordError(code, errorString)
    // console.warn(err)
}

export function logEvent(_message: string) {
    // firebase.fabric.crashlytics().log(message)
}