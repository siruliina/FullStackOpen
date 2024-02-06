import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

import { Navbar, Button, Nav } from 'react-bootstrap'

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  }

  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser(user))
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em style={{ marginRight: '15px' }}>{user.name} logged in</em>
            <Link onClick={handleLogout}>logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
