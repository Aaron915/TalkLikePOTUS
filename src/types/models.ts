
export interface User {
    username?: string,
    _id?: string,
    updatedAt?: string,
    createdAt?: string,
    profilePicture?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    profiles?: UserProfiles,
    pushNotificationId?: string,
    platform?: string,
}

export interface UserProfiles {
    facebook?: string
}

export interface UserFriend {
    name?: string,
    id: string,
    // Profile picture must be received seperately.
    profilePicture?: string
}

export interface Game {
    _id: string,
    // True if the current user initiated the game.
    creator: boolean,
    opponent: Opponent,
    rounds: Round[],
    declined?: boolean,
    forfeitPlayer?: string
}

export interface Opponent {
    firstName?: string,
    lastName?: string,
    profilePicture?: string,
    _id?: string
}

export interface Round {
    _id: string,
    words: string[],
    turns: Turn[]
}

export interface Turn {
    _id: string,
    score?: number,
    text?: string,
    user?: string,
    updatedAt?: string,
}
