import { addAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, addAnecdoteNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    
  const dispatch = useDispatch()
  
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))

    /*dispatch(addAnecdote(content))*/
    dispatch(addAnecdoteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification()) }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm