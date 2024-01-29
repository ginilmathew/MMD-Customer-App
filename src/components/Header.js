import { StyleSheet, Text, View,Image } from 'react-native'
import React, { memo } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Header = memo(() => {
    return (
        <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../images/DG.png')} style={styles.logo} />
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name='shopping-cart' size={20} color="#000" />
          <FontAwesome name='bell' size={20} color="#000" />
        </View>
      </View>
    )
})

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'space-between', // Space between children
        alignItems: 'center', // Align items in the center vertically
        paddingHorizontal: 20, 
        height:60
      },
      imageContainer: {
        marginRight: 10, // Margin to separate the image from the icon
      },
      iconContainer: {
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginLeft: 10, // Margin to separate the icon from the image
      },
      logo: {
        width: 100, // Set the width of the image
        height: 100, // Set the height of the image
        resizeMode: 'contain', // Ensure the image maintains its aspect ratio
      },
})