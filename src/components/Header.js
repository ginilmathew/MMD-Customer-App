import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/COLORS';
import CartContext from '../context/cart';
import reactotron from 'reactotron-react-native';
import { addToCart } from '../api/cart';
import { useMutation } from 'react-query';
const Header = memo(({ onPress }) => {
    const navigation = useNavigation()

    const { cartItems, setCartItems } = useContext(CartContext)

    const { mutate, refetch: postsubrefetch } = useMutation({
        mutationKey: 'addtoCart',
        mutationFn: addToCart,
        onSuccess: (data) => {
            let myStructure = data?.data?.data?.product.map((res) => (
                {
                    _id: res?._id,
                    qty: res?.qty,
                    item: { ...res }
                }
            ))
            setCartItems(myStructure)
            navigation.navigate('Cart', { cart_id: data?.data?.data?._id ?? null })
        }
    })





    const notPage = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const cartPage = useCallback(() => {
        if(cartItems?.length > 0){
            mutate({ product: cartItems?.map((res) => res?.item) })
        }else{
            navigation.navigate('Cart', { cart_id:  null })
        }
        
    }, [navigation, cartItems])




    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/DG.png')} style={styles.logo} />
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={cartPage}>
                    <IonIcons name='cart' size={20} color="#000" />
                    {cartItems?.length > 0 ? (<View style={styles.cartBadge}>
                        <Text style={styles.countStyle}>{cartItems?.length}</Text>
                    </View>) : null}

                </TouchableOpacity>
                <TouchableOpacity onPress={notPage}>
                    <View style={styles.badgeStyle} />
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
        width: 120, // Set the width of the image
        height: 120, // Set the height of the image
        // resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    },
    badgeStyle: {
        width: 10,
        height: 10,
        backgroundColor: COLORS.red,
        borderRadius: 100,
        position: "absolute",
        zIndex: 1,
        right: -1,
        top: -1,
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