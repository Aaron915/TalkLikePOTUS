import { recordError, logEvent} from '../errorUtils'

const mockRecord = jest.fn()
const mockLog = jest.fn()

jest.mock('react-native-firebase', () => {
    return {
        fabric: {
            crashlytics: () => {
                return {
                    recordError: () => {},
                    log: () => {}
                }
            }
        }
    }
})

it('Should be able to record an error', () => {
    expect(recordError(23, 'test')).toBeUndefined()
})

it('Should be able to log an event', () => {
    expect(logEvent('message')).toBeUndefined()
})