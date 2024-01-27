import { addVoteTo } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '' ) {
          return anecdotes.sort((a, b) => b.votes - a.votes)
        }
        else {
            const filteredAnecdotes = anecdotes.filter((anecdote) =>
                anecdote.content.includes(filter)
            );
            return filteredAnecdotes
        }
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVoteTo(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
      </div>
    )
}

export default AnecdoteList