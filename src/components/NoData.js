import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const NoData = () => {

  const { height } = useWindowDimensions();
 
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white
    }}>
      <Image source={require('../images/noData.png')} style={{
        height: 230, 
        width: 780,
        resizeMode: 'contain'
      }} />
      <Text>No data Found ...</Text>
    </View>
  )
}

export default NoData