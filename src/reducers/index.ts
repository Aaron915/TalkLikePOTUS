import { State } from './../types/state'
import { navReducer } from './../screens/navigation/navigation'
import loginReducer from './loginReducer'
import dataReducers from './dataReducer'
import authReducer from './authReducer'
import friendsReducer from './friendsReducer'
import currentGameReducer from './currentGameReducer'
import composeTurnReducer from './composeTurnReducer'
import gamesListReducer from './gamesListReducer'
import featurePromptReducer from './featurePromptReducer'
export default {
    nav: navReducer,
    login: loginReducer,
    data: dataReducers,
    auth: authReducer,
    friends: friendsReducer,
    currentGame: currentGameReducer,
    composeTurn: composeTurnReducer,
    gamesList: gamesListReducer,
    featurePrompt: featurePromptReducer
} as State