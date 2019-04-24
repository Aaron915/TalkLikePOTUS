import { setBearerToken } from '../../actions/authActions'
import authReducer from '../authReducer'
it('should successfully set the bearer token', () => {
    const token = '2342342'
    const state = authReducer({}, setBearerToken(token))
    expect(state.bearerToken).toBe(token)
})