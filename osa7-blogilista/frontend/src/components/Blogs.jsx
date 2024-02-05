import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Blogs
