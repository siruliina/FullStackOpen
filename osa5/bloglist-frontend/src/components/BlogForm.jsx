import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
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
            onChange={event => setTitle(event.target.value)}
            id="title"
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={event => setAuthor(event.target.value)}
            id="author"
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={event => setUrl(event.target.value)}
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm

