
export type ImageUrl = string

export interface Chirp {
    username: string
    userImage: ImageUrl
    content: string
    date: Date
    likes: number
    rechirps: number
    //coords
}