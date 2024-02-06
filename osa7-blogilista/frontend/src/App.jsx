import { useEffect } from 'react'
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
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import { checkUser } from './reducers/loginReducer'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    dispatch(checkUser())
  }, [])

  if (user === null) {
    return (
      <div className="container">
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Menu user={user} />
          <h1>Blog App</h1>
          <Notification />
        </div>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
