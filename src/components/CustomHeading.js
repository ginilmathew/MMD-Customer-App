import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '../constants/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons'
const CustomHeading = ({ label, hide }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {hide &&
        <TouchableOpacity style={styles.iconConatiner}>
          <Text style={styles.text2}>{'View All'}</Text>
          <Ionicons name='arrow-forward' color={COLORS.primary} size={25} />
        </TouchableOpacity>}

    </View>
  );
};

export default memo(CustomHeading);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, // Add a border to the bottom
    borderBottomColor: COLORS.dark_gray, // Set the border color
    paddingBottom: 5,
    marginHorizontal: 20,
    marginVertical:10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    letterSpacing: 1,
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Optional: Apply bold styling
  },
  text2: {
    letterSpacing: 1,
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold',
    color: COLORS.primary// Optional: Apply bold styling
  },
  iconConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5

  }
});
