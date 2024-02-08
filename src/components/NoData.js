import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const NoData = ({heights}) => {

  const { height } = useWindowDimensions();
 
  return (
    <View style={{
      height : heights ? heights : height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white
    }}>
      <Image source={require('../images/noData.png')} style={{
        height: 230, 
        width: 780,
        resizeMode: 'contain'
      }} />
      <Text style={{
        color: '#000',
        marginBottom: height * .4,
        marginTop: -40,
        fontFamily: "Poppins-Medium",
        opacity: 0.3,
        letterSpacing: 1.5
      }}>No Data Found!</Text>
    </View>
  )
}

export default NoData