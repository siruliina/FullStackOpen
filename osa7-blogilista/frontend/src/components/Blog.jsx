import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, setUser, getAllBlogs, addLike }) => {
  const [visible, setVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlog = async () => {
    try {
      console.log(user.token)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        const returnedBlog = await blogService.deleteBlog(blog.id, user.token)

        setUser({
          ...user,
        })
      }

      getAllBlogs()
      /*returnedBlog.user = {
        username: user.username,
        name: user.name,
      };

      setUpdatedBlog(null);*/
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {updatedBlog.title} {updatedBlog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
        {visible ? (
          <div className="visibleTest">
            <a href={updatedBlog.url}>{updatedBlog.url}</a>
            <br />
            {updatedBlog.likes}
            <button onClick={() => addLike(updatedBlog, setUpdatedBlog)}>
              like
            </button>
            <br />
            {updatedBlog.user.name}
            <br />
            {updatedBlog.user.username === user.username ? (
              <button onClick={deleteBlog}>remove</button>
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
  setUser: PropTypes.func.isRequired,
  getAllBlogs: PropTypes.func.isRequired,
}

export default Blog
