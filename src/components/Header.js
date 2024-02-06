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
import { PostAddToCart } from '../api/cart';
import { useMutation } from 'react-query';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../App';


const Header = memo(({ onPress, text }) => {

    const { cartItems, setCartItems } = useContext(CartContext);
    const { setMode } = useContext(LocationContext)

    const [cart_id] = useMMKVStorage('cart_id', storage);

    const navigation = useNavigation()



    const { mutate, refetch} = useMutation({
        mutationKey: 'addToCart_query',
        mutationFn: PostAddToCart,
        onSuccess: async (data) => {
            let myStructure = data?.data?.data?.product.map((res) => (
                {
                    _id: res?._id,
                    qty: res?.qty,
                    unit_id: res?.unit?.id,
                    varientname: res?.variant?.name,
                    item: { ...res }
                }
            ))
            setCartItems(myStructure)
            await storage.setStringAsync('cart_id', data?.data?.data?._id);
            navigation.navigate('Cart', { cart_id: data?.data?.data?._id ?? null })
        }
    })





    const notPage = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const cartPage = useCallback(() => {

        reactotron.log('API CSLLED')
        if (cartItems?.length > 0) {
            const updatedData = cartItems?.map(item => ({
                ...item.item,
                qty: item.qty

            }));
            mutate({ product: updatedData, cartId: cart_id ? cart_id : null })
        } else {
            navigation.navigate('Cart', { cart_id: null })
        }
        // navigation.navigate('Cart', { cart_id: null })
    }, [navigation, cartItems,cart_id])




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
                    gap: 2,
                    marginRight: 30,
                    flex: 1,
                    alignItems: 'center',
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
        width: 100, // Set the width of the image
        height: 100, // Set the height of the image
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