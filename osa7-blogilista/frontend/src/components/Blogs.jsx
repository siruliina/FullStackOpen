import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeBlogs } from '../reducers/blogReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { Table } from 'react-bootstrap'

const Blogs = () => {
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
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Table striped>
        <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
