import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import {
    rootSaga
} from '../sagas'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import devToolsEnhancer from 'remote-redux-devtools'
import reducers from '../reducers'
import createEncryptor from 'redux-persist-transform-encrypt'

const encryptor = createEncryptor({
    secretKey: '[REDACTED]'
})

const reduxPersistConfig = {
    key: 'root',
    transforms: [encryptor],
    storage,
    whitelist: ['data', 'auth', 'featurePrompt']
}

const reducer = persistCombineReducers(reduxPersistConfig, reducers)
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), devToolsEnhancer())
)

sagaMiddleware.run(rootSaga)

export const persistor =  persistStore(store)
