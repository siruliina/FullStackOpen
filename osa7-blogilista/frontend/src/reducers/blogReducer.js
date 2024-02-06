import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { initializeUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(content)
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id, userToken) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, userToken)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(initializeUsers())
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(initializeUsers())
  }
}

export default blogSlice.reducer
