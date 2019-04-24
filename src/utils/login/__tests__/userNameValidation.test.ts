import {
    validateUserName,
    UserNameError,
    messageForError
 } from '../../login/userNameValidation'

it('Should return an error if the text is zero length', () => {
    expect(() => validateUserName('')).toThrow(UserNameError.ZeroLength)
})

it('should return an error if the username is too long', () => {
    expect(() => validateUserName('fds;adfasdfasdfasdfasdfdsfsdfsdfsfs')).toThrow(UserNameError.MaxLengthExceeded)
})

it('should return an error if the username contains emojis', () => {
    expect(() => validateUserName('sdfds🙏🏾😩')).toThrow(UserNameError.ContainsEmojis)
})

it('should return an error if the username contains spaces', () => {
    expect(() => validateUserName('sdfds fd')).toThrow(UserNameError.ContainsSpaces)
})

it('should return the same string when its a valid user name', () => {
    expect(validateUserName('sdfdsfd')).toBe('sdfdsfd')
})

it('should return the right error message for each type of user name error', () => {
    expect(messageForError(UserNameError.MaxLengthExceeded)).toBe(`Username length must not exceed 20 characters.`)
    expect(messageForError(UserNameError.ContainsEmojis)).toBe('Username must not contain emojis.')
    expect(messageForError(UserNameError.ContainsSpaces)).toBe('Username must not contain spaces.')
})
