
export type ImageUrl = string
export type PostId = string
export type UserHandle = string
export type UserId = string

export interface Comment {
    userId: UserId
    userHandle: UserHandle
    content: string
    date?: Date
}

export type Coordinates = {
    latitude: number
    longitude: number
}

export interface ChirpData {
    _id: PostId
    userId: UserId
    comments: Comment[]
    likes: string[]
    coordinates: Coordinates
    content: string
}

export interface Chirp {
    username: string
    userHandle?: UserHandle
    userImage: ImageUrl
    content: string
    date: Date
    likes: number
    comments: number
    coordinates: Coordinates
    // likes: UserId[]
    // comments: Comment[]
    //coords
}

export interface MongoDBUser {
    _id: UserId,
    username: string
    userHandle: UserHandle
    userImage: ImageUrl
    bio: string
    posts: PostId[]
    likedPosts: PostId[]
}