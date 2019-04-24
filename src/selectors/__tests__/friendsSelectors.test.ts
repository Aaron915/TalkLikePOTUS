import { getFriendsSectionData } from './../friendsSelectors'
import { getNextPage } from '../friendsSelectors'
import  { State } from '../../types/state'
import { loadJSON } from '../../mockData/loadJSON'
function buildStateWithFriendsProps(props): State {
    return {
        friends: props
    } as State
}

it('should be able to get the next page', () => {    const nextPage = 'adsfsdf'
    expect(getNextPage(buildStateWithFriendsProps({nextPage}))).toBe(nextPage)
})

it('should be able to transform a users friend into data for cells', () => {
    const friends = loadJSON('user_friend_1_with_pic')
    const state = {
        data: {
            friends
        }
    } as State

    const friendsData = getFriendsSectionData(state)
    const firstFriend = friendsData[0]
    expect(firstFriend.key).toBe('10155838103539265')
    expect(firstFriend.name).toBe('Adam Bailey')
    expect(firstFriend.imageUrl).toBe('https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/22728880_10155804124074265_7840011817798697909_n.jpg?oh=e0058be6947b7687eba16d7c356d1abd&oe=5A95B109')
})