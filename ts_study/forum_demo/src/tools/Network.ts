const host = 'http://localhost:3000/'
const networkPath = {
    signUp: host + 'users/create',
    login: host + 'users/login',
    categories: host + 'post/categories',
    posts: host + 'post/posts',
    createPost: host + 'post/create',
    detail: host + 'post/detail',
    deletePost: host + 'post/delete',
    comments: host + 'comment/comments',
    deleteComment: host + 'comment/delete',
    createComment: host + 'comment/create',
    searchPosts: host + 'post/search'
}
export default networkPath;