import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const CustomTab = ({onPress,label}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomTab

const styles = StyleSheet.create({
    container:{
        padding:2,
        color:COLORS.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:14,
        color:COLORS.white
    }

})