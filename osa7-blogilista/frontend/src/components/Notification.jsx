import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({notification}) => {
    console.log(notification)
    return notification
  })

  if (notification.notification === null) {
    return null
  }

  return <div className={notification.type}>{notification.notification}</div>
}

export default Notification
