import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    if ((title, author, url)) {
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
        dispatch(setNotification('Failed to create a new blog', 'danger', 5))
      }
    } else {
      dispatch(
        setNotification('You need to apply the blog information', 'danger', 5)
      )
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            id="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            id="author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
            id="url"
          />
        </Form.Group>
        <Button variant="primary" style={{ marginTop: '15px' }} type="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
