import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const NoData = () => {
  return (
    <View style={{
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      backgroundColor: COLORS.white
    }}>
      <Text>No data...</Text>
    </View>
  )
}

export default NoData