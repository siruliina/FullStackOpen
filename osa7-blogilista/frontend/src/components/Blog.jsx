import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  likeBlog,
  deleteBlog,
  initializeBlogs,
  addComment,
} from '../reducers/blogReducer'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

const Blog = ({ user }) => {
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState('')

  const blogs = useSelector(({ blogs }) => {
    console.log('bloooogs', blogs)
    return blogs
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)

  const removeBlog = async () => {
    try {
      console.log(user.token)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog.id, user.token))
      }
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const addLike = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      console.error(error)
    }
  }

  const commentBlog = (event, comment) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, comment))
      setInput('')
      setVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <Button
          variant="primary"
          style={{ margin: '15px' }}
          onClick={() => addLike(blog)}
        >
          Like
        </Button>
        <br />
        Added by {blog.user.name}
        <br />
        {blog.user.username === user.username ? (
          <Button
            variant="secondary"
            style={{ marginTop: '15px' }}
            onClick={removeBlog}
          >
            Remove
          </Button>
        ) : null}
        <div style={{ marginTop: '30px' }}>
          <h3>Comments</h3>
          <Button variant="primary" onClick={() => setVisible(true)}>
            Add comment
          </Button>
          <Button
            variant="secondary"
            style={{ margin: '15px' }}
            onClick={(event) => {
              commentBlog(event, `haven't read this yet`)
            }}
          >
            Haven't read this yet
          </Button>
          {visible ? (
            <Form onSubmit={(event) => commentBlog(event, input)}>
              <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  value={input}
                  name="Comment"
                  onChange={(event) => setInput(event.target.value)}
                  id="comment"
                />
              </Form.Group>
              <Button type="submit">Add</Button>
              <Button
                variant="secondary"
                style={{ margin: '15px' }}
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </Form>
          ) : null}
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blog
