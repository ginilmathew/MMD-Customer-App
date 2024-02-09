import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { COLORS } from '../constants/COLORS'

const CustomTab = ({ onPress, label, subList }) => {

  const memoizedOnPress = useCallback(() => {
    onPress(label);
  }, [onPress, label]);
  return (
    <TouchableOpacity onPress={memoizedOnPress} style={[styles.container, { backgroundColor: subList?.name === label ? COLORS.primary : '#f2f2f2' }]}>
      <Text style={[styles.textStyle, { color: subList?.name === label ? '#fff' : COLORS.light }]}>{label}</Text>
    </TouchableOpacity>
  )
}


export default memo(CustomTab)
const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    padding: 5,

    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    fontSize: 10,
  }

})