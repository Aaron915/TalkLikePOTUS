import {
    State
} from '../types/state'
import { createSelector } from 'reselect'

export const getBearerToken = (state: State) => state.auth.bearerToken
export const getBearerTokenHeader = createSelector(
    getBearerToken,
    (token: string) => `Bearer ${token}`
)

export const getIsAuthenticated: (state: State) => boolean = createSelector(
    getBearerToken,
    (token: string) => {
        return token !== undefined
    }
)