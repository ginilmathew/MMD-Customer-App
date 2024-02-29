import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import COLORS from '../constants/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons'
const CustomHeading = ({ label, hide, onPress, marginH }) => {

  const styles = makeStyle(COLORS)

  return (
    <View style={[styles.container, { marginHorizontal: marginH ? marginH : 20 }]}>
      <Text style={styles.text}>{label}</Text>
      {hide &&
        <TouchableOpacity style={styles.iconConatiner} onPress={onPress}>
          <Text style={styles.text2}>{'View All'}</Text>
          <Ionicons name='arrow-forward' color={COLORS.primary} size={18} />
        </TouchableOpacity>}
    </View>
  );
};

export default memo(CustomHeading);

const makeStyle = (color) => StyleSheet.create({
  container: {
    borderBottomWidth: 1, // Add a border to the bottom
    borderBottomColor: COLORS.gray, // Set the border color
    paddingBottom: 5,

    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    color: COLORS.light,
    fontSize: 20, // Adjust the font size as needed
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
    letterSpacing: 1,
    fontSize: 15, // Adjust the font size as needed
    color: color.primary,// Optional: Apply bold styling
  },
  iconConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5
  }
});
