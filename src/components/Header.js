import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/COLORS';
import CartContext from '../context/cart';
import reactotron from 'reactotron-react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'
import LocationContext from '../context/location';


const Header = memo(({ onPress, text }) => {

    const { cartItems } = useContext(CartContext)
    const { setMode } = useContext(LocationContext)

    reactotron.log(cartItems, "CART")

    const navigation = useNavigation()

    const notPage = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const cartPage = useCallback(() => {
        navigation.navigate('Cart')
    }, [navigation])

    const textLeng = text?.length;

    const changeLoc = () => {
        setMode('home');
        navigation.navigate('GoogleLocation')
    }


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/DG.png')} style={[styles.logo]} />
            </View>

            {text && (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 3,
                    flex: 1,
                    marginLeft: -20,
                    justifyContent: 'center'
                }} onPress={changeLoc}>
                    <IonIcon name='location' size={20} color={COLORS.primary} />
                    <Text style={{
                        fontSize: 11,
                        color: COLORS.dark,
                    }}>{text
                        ?.slice(...textLeng ? [0, 24] : [0])
                        ?.concat(textLeng ? ' ...' : '')}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={cartPage}>
                    <IonIcons name='cart' size={20} color="#000" />
                    {cartItems?.length > 0 ? (<View style={styles.cartBadge}>
                        <Text style={styles.countStyle}>{cartItems?.length}</Text>
                    </View>) : null}

                </TouchableOpacity>
                <TouchableOpacity onPress={notPage}>
                    <View style={styles.badgeStyle}>
                        <Text style={styles.countStyle}>1</Text>
                    </View>
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
        backgroundColor: COLORS.white
    },
    imageContainer: {
        marginRight: 10, // Margin to separate the image from the icon
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        // Margin to separate the icon from the image
    },
    logo: {
        width: 100, // Set the width of the image
        height: 100, // Set the height of the image
        // resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    },
    badgeStyle: {
        width: 15,
        height: 15,
        backgroundColor: COLORS.red,
        borderRadius: 100,
        position: "absolute",
        zIndex: 1,
        right: -4,
        top: -4,
        alignItems: "center",
        justifyContent: "center",
    },
    countStyle: {
        fontFamily: "Poppins-SemiBold",
        color: COLORS.white,
        fontSize: 10
    },
    cartBadge: {
        width: 15,
        height: 15,
        backgroundColor: COLORS.blue,
        borderRadius: 100,
        position: "absolute",
        right: -4,
        top: -4,
        alignItems: "center",
        justifyContent: "center",
    },
})