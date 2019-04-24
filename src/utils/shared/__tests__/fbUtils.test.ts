import { loadJSON } from '../../../mockData/loadJSON'
import { userProfilePicParams } from '../fbUtils'
it('should be able to build a profile request from a users id', () => {
    const friend = loadJSON('user_friends_1').data[0]
    const profilePicPath = userProfilePicParams(friend)
    expect(profilePicPath.path).toEqual('10155838103539265/picture?redirect=false')
    expect(profilePicPath.type).toBe('GET')
})