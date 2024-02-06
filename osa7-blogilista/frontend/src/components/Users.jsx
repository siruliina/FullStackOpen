import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(({ users }) => {
    console.log(users)
    return users
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Users
