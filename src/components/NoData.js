import React from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { COLORS } from '../constants/COLORS';

const NoData = ({ heights }) => {
  const { height } = useWindowDimensions();
  const imageHeight = height * 0.4; // Adjust image height dynamically
  const textMarginTop = -40; // Margin top for the text

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/noData.png')}
        style={[styles.image, { height: heights ? heights : imageHeight }]}
      />
      <Text style={[styles.text, { marginTop: textMarginTop }]}>No Data Found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  image: {
    aspectRatio: 3 / 4, // Aspect ratio 4:3 for width:height
    resizeMode: 'contain'
  },
  text: {
    color: '#000',
    fontFamily: "Poppins-Medium",
    opacity: 0.3,
    letterSpacing: 1.5
  }
});

export default NoData;
