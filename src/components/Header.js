import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/COLORS';
const Header = memo(({ onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/DG.png')} style={styles.logo} />
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onPress}>
                    <FontAwesome name='shopping-cart' size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name='bell' size={20} color="#000" />
                </TouchableOpacity>
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
        paddingHorizontal: 22,
        height: 60,
        backgroundColor: COLORS.white 
    },
    imageContainer: {
        marginRight:10, // Margin to separate the image from the icon
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
       // Margin to separate the icon from the image
    },
    logo: {
        width: 120, // Set the width of the image
        height: 120, // Set the height of the image
        // resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    },
})