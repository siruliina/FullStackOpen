import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'

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
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users
