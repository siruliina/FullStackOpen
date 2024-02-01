import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      dispatch(
        setNotification(`logged in successfully with ${username}`, 'success', 5)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user:', user.username)
    dispatch(
      setNotification(
        `logged out successfully with ${user.username}`,
        'success',
        5
      )
    )
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  /*const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = dispatch(createBlog(blogObject))

      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      }

      //setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} was created`,
          'success',
          5
        )
      )

      setUser({
        ...user,
      })
    } catch (error) {
      console.error(error)
      dispatch(setNotification('Failed to create a new blog', 'error', 5))
    }
  }*/

  const addLike = async (updatedBlog, setUpdatedBlog) => {
    try {
      console.log(updatedBlog)
      const returnedBlog = await blogService.updateBlog({
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
      })

      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      }

      setUpdatedBlog(returnedBlog)

      setUser({
        ...user,
      })

      //getAllBlogs()
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setUser={setUser}
          addLike={addLike}
        />
      ))}
    </div>
  )
}

export default App
