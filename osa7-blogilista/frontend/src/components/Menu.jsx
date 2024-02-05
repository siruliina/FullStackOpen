import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  }

  const menuStyling = {
    backgroundColor: 'rgb(220,220,220)',
    padding: 5,
  }

  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser(user))
  }

  return (
    <div style={menuStyling}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
