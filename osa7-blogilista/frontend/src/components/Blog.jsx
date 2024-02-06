import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  likeBlog,
  deleteBlog,
  initializeBlogs,
  addComment,
} from '../reducers/blogReducer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = ({ user }) => {
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState('')

  const blogs = useSelector(({ blogs }) => {
    console.log('bloooogs', blogs)
    return blogs
  })

  const dispatch = useDispatch()

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
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
        <br />
        added by {blog.user.name}
        <br />
        {blog.user.username === user.username ? (
          <button onClick={removeBlog}>remove</button>
        ) : null}
        <h2>comments</h2>
        <button
          onClick={(event) => {
            commentBlog(event, `haven't read this yet`)
          }}
        >
          haven't read this yet
        </button>
        <button onClick={() => setVisible(true)}>add comment</button>
        {visible ? (
          <form onSubmit={(event) => commentBlog(event, input)}>
            <div>
              comment
              <input
                type="text"
                value={input}
                name="Comment"
                onChange={(event) => setInput(event.target.value)}
                id="comment"
              />
            </div>
            <button type="submit">add</button>
          </form>
        ) : null}
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blog
