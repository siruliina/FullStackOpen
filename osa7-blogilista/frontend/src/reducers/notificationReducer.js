import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload.notification
      const type = action.payload.type

      return { notification, type }
    },
    hideNotification(state, action) {
      console.log(state, action)

      return { notification: '', type: '' }
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (notification, type, seconds) => {
  return async (dispatch) => {
    await dispatch(showNotification({ notification: notification, type: type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
