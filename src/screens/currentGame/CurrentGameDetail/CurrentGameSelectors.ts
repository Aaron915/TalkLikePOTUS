import { getGameNumberOfRounds } from './../../../selectors/gameSelectors'
import { State } from './../../../types/state'
import { createSelector } from 'reselect'

export const getCurrentGameDetailData: (state: State) => any[] = createSelector(
    getGameNumberOfRounds,
    (numberOfRounds: number) => {
        if (!numberOfRounds || numberOfRounds === 0) {
            return [{
                key: 1,
                round: 1
            }]
        }

        let data = []
        for (let i = 1; i <= numberOfRounds;  i++) {
            data.push({
                key: i,
                round: i
            })
        }

        return data
    }
)