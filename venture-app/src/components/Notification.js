import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state=>state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.length == 0) {
    return (<div></div>)
  }
  return (
    <div style={style}>
      {notification[notification.length-1].message}
    </div>
  )
}

export default Notification