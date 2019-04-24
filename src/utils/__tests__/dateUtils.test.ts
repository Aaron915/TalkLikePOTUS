import { datesAreAboveDaysApart } from '../dateUtils'

describe('determining if dates are x days apart', () => {
    it('should return true if they are at least x days apart', () => {
        const firstDate = new Date('2018-02-11T19:57:31.540Z')
        const secondDate = new Date('2018-02-15T19:57:35.540Z')
        expect(datesAreAboveDaysApart(firstDate, secondDate, 4)).toEqual(true)
    })

    it('should return false if they are not at least x days apart', () => {
        const firstDate = new Date('2018-02-11T19:57:31.540Z')
        const secondDate = new Date('2018-02-15T19:56:30.540Z')
        expect(datesAreAboveDaysApart(firstDate, secondDate, 4)).toEqual(false)
    })
})