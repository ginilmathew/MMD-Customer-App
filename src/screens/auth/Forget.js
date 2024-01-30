import { View, Text } from 'react-native'
import React from 'react'

const Forget = () => {

    const navToRegister = useCallback(() => {
        navigation.navigate('Register')
    }, [navigation])

  return (
    <View>
      <Text>Forget</Text>
    </View>
  )
}

export default Forget