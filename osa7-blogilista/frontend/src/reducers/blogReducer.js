import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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

export const voteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.updateBlog({ ...blog, votes: blog.votes + 1 })
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer