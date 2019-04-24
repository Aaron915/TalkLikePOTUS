import { circleStyle } from '../styleUtils'

it('Should be able to output circle style a height', () => {
    const style = circleStyle(40)
    expect(style.height).toEqual(40)
    expect(style.width).toEqual(40)
    expect(style.borderRadius).toEqual(20)
})