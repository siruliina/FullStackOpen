import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'

import { checkUser, loginUser, logoutUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    dispatch(checkUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser(user))
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
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
