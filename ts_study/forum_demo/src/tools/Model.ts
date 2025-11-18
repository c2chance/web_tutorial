import { UserInfo } from './Store'

interface CategoryModel {
    id: number
    label: string
    position: number
}

interface Post {
    author: UserInfo
    category: CategoryModel
    id: number
    title: string
    summary: string
    content: string
    publish_time: string
}

interface Comment {
    author: UserInfo,
    reply?: UserInfo,
    id: number,
    content: string,
    publish_time: string
}

export {
    CategoryModel,
    Post,
    Comment
}