import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeBlogs } from '../reducers/blogReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
