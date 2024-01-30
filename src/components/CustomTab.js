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
        marginVertical:3,
        padding:5,
        backgroundColor:COLORS.dark_gray,
        justifyContent:'center',
        borderRadius:5,
        alignItems:'center'
    },
    textStyle:{
        fontFamily: 'Poppins-Italic',
        letterSpacing:1,
        fontWeight:'bold',
        fontSize:14,
        color:'#000'
    }

})