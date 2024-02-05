import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
        {visible ? (
          <div className="visibleTest">
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes}
            <button onClick={() => addLike(blog)}>like</button>
            <br />
            {blog.user.name}
            <br />
            {blog.user.username === user.username ? (
              <button onClick={removeBlog}>remove</button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
