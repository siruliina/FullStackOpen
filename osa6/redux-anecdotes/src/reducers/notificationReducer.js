import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
        const notification = action.payload
        
        return notification
    },
    hideNotification(state, action) {
        console.log(state, action)
        
        return ''
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    await dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(hideNotification()) }, seconds*1000)
  }
}

export default notificationSlice.reducer