import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state,action) {
            return state.concat(action.payload)
        },
        createVote(state,action) {
            const id = action.payload.id
            return state.map(blog => blog.id !== id ? blog : action.payload)
        },
        removeBlog(state,action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        setBlogs(state,action) {
            return action.payload
        },
        addComment(state,action) {
            const id = action.payload.id
            return state.map(blog => blog.id !== id ? blog : action.payload)
        }
    }
})

export const { appendBlog, createVote, removeBlog, setBlogs, addComment } = blogSlice.actions
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = (blogObject) => {
    return async dispatch => {
        const returnedBlog = await blogService.create(blogObject)
        dispatch(appendBlog(returnedBlog))
    }
}
export const voteBlog = (id,blogObject) => {
    return async dispatch => {
        const returnedBlog = await blogService.update(id,blogObject)
        //console.log(returnedBlog)
        dispatch(createVote(returnedBlog))
    }
}
export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}
export const addBlogComment = (id,commentObject) => {
    return async dispatch => {
        const returnedBlog = await blogService.addComment(id,commentObject)
        dispatch(addComment(returnedBlog))
    }
}
export default blogSlice.reducer