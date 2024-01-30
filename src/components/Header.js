import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Header = memo(({ onPress }) => {

    const navigation = useNavigation()

    const notPage = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const cartPage = useCallback(() => {
        navigation.navigate('Cart')
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/DG.png')} style={styles.logo} />
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={cartPage}>
                    <IonIcons name='cart' size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={notPage}>
                    <IonIcons name='notifications' size={20} color="#000" />
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
        backgroundColor: "#fff"
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