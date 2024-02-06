import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    console.log(notification)
    return notification
  })

  if (notification.notification === null) {
    return null
  }

  return <Alert variant={notification.type}>{notification.notification}</Alert>
}

export default Notification
