import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const likeAnecdote = async (id) => {
    const response = await axios.get(baseUrl + `/${id}`)
    const anecdote = response.data
  
    anecdote.votes++

    const updatedResponse = await axios.put(baseUrl + `/${id}`, anecdote)

    return updatedResponse.data
}

const createNew = async (content) => {
    const object = { 
        content: content,
        votes: 0 
    }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

export default { getAll, likeAnecdote, createNew }