import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(
        createBlog({
          title: title,
          author: author,
          url: url,
        })
      )

      dispatch(
        setNotification(
          `A new blog ${title} by ${author} was created`,
          'success',
          5
        )
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error)
      dispatch(setNotification('Failed to create a new blog', 'error', 5))
    }
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            id="title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            id="author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
            id="url"
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm
