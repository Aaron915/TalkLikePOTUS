import emojiRegex from 'emoji-regex'
import {
    LoginStrings
} from '../../constants/strings'
import {
    maxUserNameLength
} from '../../constants/appConstants'

export enum UserNameError {
    ContainsSpaces = 'CONTAINS_SPACES',
    MaxLengthExceeded = 'MAX_LENGTH_EXCEEDED',
    ContainsEmojis = 'CONTAINS_EMOJIS',
    ZeroLength = 'ZERO_LENGTH'
}

function hasWhiteSpace(userName: string): boolean {
    const whitespace = /\s/.test(userName)
    return whitespace
}

function invalidLength(userName: string): boolean {
    return userName.length > maxUserNameLength
}

function hasEmojis(userName: string): boolean {
    const regex = emojiRegex()
    const onUserName = regex.exec(userName)
    if (!onUserName) {
        return false
    } else {
        return true
    }
}

export function validateUserName(userName: string): string {
    const trimmedUserName = userName.trim()
    if (hasWhiteSpace(trimmedUserName)) {
        throw UserNameError.ContainsSpaces
    } else if (invalidLength(trimmedUserName)) {
        throw UserNameError.MaxLengthExceeded
    } else if (hasEmojis(trimmedUserName)) {
        throw UserNameError.ContainsEmojis
    } else if (trimmedUserName.length === 0) {
        throw UserNameError.ZeroLength
    }

    return userName
}

export function messageForError(userNameError: UserNameError): string | undefined {
    // No error message for zero length user name.
    switch (userNameError) {
        case UserNameError.ContainsSpaces:
            return LoginStrings.ERROR_SPACES
        case UserNameError.MaxLengthExceeded:
            return LoginStrings.ERROR_LENGTH
        case UserNameError.ContainsEmojis:
            return LoginStrings.ERROR_EMOJIS
        default:
            return undefined
    }
}