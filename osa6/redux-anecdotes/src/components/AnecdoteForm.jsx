import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    
  const dispatch = useDispatch()
  
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))

    dispatch(setNotification(`new anecdote '${content}' added`, 5))
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