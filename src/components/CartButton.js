import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../App';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/COLORS';
import CartContext from '../context/cart';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const CartButton = ({ onPress: callback, toCart, grand, w, bottom }) => {

    const { cartItems } = useContext(CartContext);
    const [cart_id] = useMMKVStorage('cart_id', storage)
    const navigation = useNavigation()

    
    const onPress = useCallback(() => {
        navigation.navigate('Cart', { cart_id: cart_id ?? null });
    }, [cart_id])

    let total = 0;

    // let unitID = products?.unit.id;
    // let varientName = products?.variant?.name;
     
    // reactotron.log({unitID})
    // reactotron.log({varientName})

    const getFinalPrices = (item) => {

        let products = item.products ? item.products[0] : item?.item;

        if (!products?.variant) {
            return null;
        }
        const { offerPrice, fromDate, toDate, sellingPrice, costPrice } = products.variant;

        let product;

        if(fromDate && toDate && offerPrice){
            let startDate = moment(fromDate, "YYY-MM-DD").add(-1, 'day');
            let endDate = moment(toDate, "YYYY-MM-DD").add(1, 'day')
            if(moment().isBetween(startDate, endDate)){
                product = {
                    ...products.variant,
                    finalPrice: offerPrice,
                    hasOfferPrice: true,
                    discount: parseFloat(sellingPrice)-parseFloat(offerPrice),
                    discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(offerPrice)) / parseFloat(costPrice)).toFixed(2)*1,
                    unitName: products?.unit?.name
                }
            }
            else{
                product = { 
                    ...products.variant, 
                    finalPrice: sellingPrice, 
                    hasOfferPrice: false,
                    discount: 0,
                    discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2)*1,
                    unitName: products?.unit?.name
                };
            }
        }
        else{
            product = { 
                ...products.variant, 
                finalPrice: sellingPrice, 
                hasOfferPrice: false,
                discount: 0,
                discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2)*1,
                unitName: products?.unit?.name
            };
        }

        total += parseFloat(product?.finalPrice) * parseInt(item?.qty);
        // setPrice(product)
        // if (!offerPrice || isOfferExpired(fromDate, toDate)) {
        //     return { ...products.variant, finalPrice: sellingPrice, hasOfferPrice: false };
        // }
        // return { ...products.variant, finalPrice: offerPrice, hasOfferPrice: true };
    };

    cartItems?.forEach(getFinalPrices);

    if(cartItems?.length === 0) {
        return
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, { bottom }]}
        >
            <View style={styles.leftContainer}>
                <IonIcon
                    color="#fff"
                    name='cart'
                    size={30}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{"Go to Cart"}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.totalText}>{'total'}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{total}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 60,
        marginHorizontal: 20,
        position: 'absolute',
        borderRadius: 10
    },
    leftContainer: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#b1bd9f',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        flex: 3
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    textContainer: {
        marginLeft: 20,
        justifyContent: 'center',
        flexShrink: 1
    },
    mainText: {
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    subTextContainer: {
        flexDirection: 'row',

        marginTop: 2
    },
    subText: {
        color: 'white',
        marginRight: 5
    },
    rightContainer: {
        backgroundColor: COLORS.primary,
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 8,
        paddingLeft: 8,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalText: {
        color: 'white',
        fontSize: 12
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2
    },
    price: {
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        fontSize: 16
    },
    currency: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginLeft: 2
    }
});


export default CartButton