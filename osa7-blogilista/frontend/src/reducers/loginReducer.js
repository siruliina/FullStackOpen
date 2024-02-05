import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(
        setNotification(
          `logged in successfully with ${user.username}`,
          'success',
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'error', 5))
    }
  }
}

export const checkUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      dispatch(setUser(user))

      blogService.setToken(user.token)
    }
  }
}

export const logoutUser = (user) => {
  return (dispatch) => {
    dispatch(
      setNotification(
        `logged out successfully with ${user.username}`,
        'success',
        5
      )
    )
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(setUser(null))
  }
}

export default userSlice.reducer
