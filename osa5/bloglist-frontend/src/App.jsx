import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const blogFormRef = useRef()

  /*useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs([...blogs].sort((a, b) => b.likes - a.likes));
      //setBlogs( sortedBlogs )
    }
    )
  }, [blogs]);

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)

      setUser(user)
      setMessage(`logged in successfully with ${username}`)
      setType('success')
      setTimeout(() => {setMessage(null)}, 5000)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('wrong credentials')
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    console.log("logging out user:", user.username)
    setMessage(`logged out successfully with ${user.username}`)
    setType('success')
    setTimeout(() => {setMessage(null)}, 5000)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
  
    try {
      const returnedBlog = await blogService.createBlog(blogObject);
  
      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      };
  
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} was created`);
      setType('success');
      
      setUser({
        ...user,
      });
  
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to create a new blog');
      setType('error');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} setUser={setUser}/>
      )}
    </div>
  )
}

export default App