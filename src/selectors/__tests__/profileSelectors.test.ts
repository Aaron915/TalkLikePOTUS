import { getProfileProps } from './../profileSelectors'
import { State } from './../../types/state'
import { loadJSON } from '../../mockData/loadJSON'

it('shoul have all of the values for a user', () => {
    const user = loadJSON('update_user_response_1').response.user
    const state = {
        data: {
            user: user
        }
    } as State

    const profileProps = getProfileProps(state)

    expect(profileProps.profilePicURL).toEqual('https://graph.facebook.com/10155926051384314/picture?type=large')
    expect(profileProps.userFullName).toEqual('Aaron Williams')
    expect(profileProps.username).toEqual('Aaron')
    expect(profileProps.pushNotifcationsEnabled).toEqual(true)
})