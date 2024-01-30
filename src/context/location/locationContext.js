import { useState } from 'react'
import Context from '.'

const locationContext = ({ children }) => {

    const [location, setLocation] = useState({
        latitude: '36.2048',
        longitude: '138.2529'
    })

  return (
    <Context.Provider
        value={{
            location,
            setLocation
        }}
    >
        { children }
    </Context.Provider>
  )
}

export default locationContext