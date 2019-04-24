import { getBearerToken, getBearerTokenHeader, getIsAuthenticated } from '../authSelectors'
import { State } from '../../types/state'
it('should be able to retrieve the bearer token', () => {
    let state = { auth: undefined} as State
    const token = '324'
    state.auth = {
        bearerToken: token
    }

    expect(getBearerToken(state)).toEqual(token)
})

it('should be able to create the correct header', () => {
    let state = { auth: undefined} as State
    const token = '324'
    state.auth = {
        bearerToken: token
    }
    expect(getBearerTokenHeader(state)).toEqual('Bearer 324')
})

it('should be able to tell when the user is authenticated', () => {
    let hasAuthState = {
        auth: {
            bearerToken: '123'
        }
    } as State
    let noAuthState = {
        auth: {
            bearerToken: undefined
        }
    } as State

    expect(getIsAuthenticated(hasAuthState)).toBeTruthy()
    expect(getIsAuthenticated(noAuthState)).toBeFalsy()
})