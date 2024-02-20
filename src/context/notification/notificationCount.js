import { View, Text } from 'react-native'
import NotificationContext from '.'
import { useState } from 'react'

const notificationCount = ({ children }) => {
    const [count, setCount] = useState(0);

  return (
    <NotificationContext.Provider value={{
        count,
        setCount
    }}>
      { children }
    </NotificationContext.Provider>
  )
}

export default notificationCount