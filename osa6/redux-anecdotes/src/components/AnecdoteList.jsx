import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
        if ( filter === '' ) {         
          return sortedAnecdotes
        }
        else {
            const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
                anecdote.content.toUpperCase().includes(filter.toUpperCase())
            )
            return filteredAnecdotes
        }
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )}
      </div>
    )
}

export default AnecdoteList