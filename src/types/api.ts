export interface APIResponse {
    meta: MetaData,
    response: any
}

export interface MetaData {
    code: number
    status: string
}