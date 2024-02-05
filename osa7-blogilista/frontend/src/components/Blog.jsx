import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, initializeBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Blog = ({ user }) => {
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
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blog
