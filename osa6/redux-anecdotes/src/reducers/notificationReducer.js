import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voteNotification(state, action) {
        const anecdote = action.payload
        
        return `you voted '${anecdote}'`
    },
    hideNotification(state, action) {
        console.log(state, action)
        
        return ''
    },
    addAnecdoteNotification(state, action) {
        const anecdote = action.payload
        
        return `new anecdote '${anecdote}' added`
    }
  }
})

export const { voteNotification, hideNotification, addAnecdoteNotification } = notificationSlice.actions
export default notificationSlice.reducer