import React, { memo, useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import { useNavigation } from '@react-navigation/core';

const CustomItemCard = ({ onPress, item, key }) => {

    const navigation = useNavigation()

    const { cartItems, addToCart, incrementItem, decrementItem } = useContext(CartContext);

    const isCartAdded = cartItems.some(cartItem => cartItem.id === item._id);
    const cartItem = cartItems.find(cartItem => cartItem.id === item._id);

    const handleAddToCart = useCallback(() => {
        addToCart(item._id);
    }, [addToCart, item._id]);

    const handleIncrement = useCallback(() => {
        incrementItem(item._id);
    }, [incrementItem, item._id]);

    const handleDecrement = useCallback(() => {
        decrementItem(item._id);
    }, [decrementItem, item._id]);

    const NavigateToSingleProduct = useCallback(() => {
        navigation.navigate('SingleProduct', {item : item?.products?.[0] })
    }, [navigation])
    // TouchableOpacity onPress={NavigateToSingleProduct}


    const AnimatedStyle = FadeInDown.easing().delay(300);

    const BASEPATHPRODCT =  item?.products?.[0]?.imageBasePath;
    const BASEPATHP = item?.imageBasePath ?? null;

    return (
        <Animated.View entering={AnimatedStyle} key={key}>
            <TouchableOpacity onPress={NavigateToSingleProduct} style={styles.container}>
                {/* Left Side */}
                <View style={styles.leftContainer}>
                    {item?.products && <Image
                        source={{ uri: BASEPATHPRODCT + item?.products?.[0]?.image?.[0] }}
                        style={styles.leftImage}
                    />}
                    {item?.image && <Image
                        source={{ uri: BASEPATHP + item?.image?.[0] }}
                        style={styles.leftImage}
                    />}
                </View>

                {/* Center Content */}
                <View style={styles.centerContainer}>
                    <Text style={styles.heading}>{item?.products ? item?.products?.[0]?.name : item?.name}</Text>
                    <Text style={styles.subHeading}>Category: {item?.products ? item?.products?.[0]?.category?.name : item?.category?.name}</Text>
                    <View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to 10% off!</Text>
                    </View>
                </View>

                {/* Right Side */}
                <View style={styles.rightContainer}>
                    <Text style={styles.topPrice}>₹200</Text>
                    <AddToCart
                        isCartAdded={isCartAdded}
                        handleAddToCart={handleAddToCart}
                        handleDecrement={handleDecrement}
                        handleIncrement={handleIncrement}
                        cartItem={cartItem} />
                </View>
            </TouchableOpacity>

        </Animated.View>
    );
};



const AddToCart = memo(({ isCartAdded, handleDecrement, handleAddToCart, handleIncrement, cartItem }) => {
    const memoizedDecrement = useCallback(handleDecrement, [handleDecrement]);
    const memoizedIncrement = useCallback(handleIncrement, [handleIncrement]);
    const memoizedAddToCart = useCallback(handleAddToCart, [handleAddToCart]);

    return (
        <>
            {isCartAdded ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.incrementButton, { paddingHorizontal: 12 }]} onPress={memoizedDecrement}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{cartItem.count}</Text>
                    <TouchableOpacity style={[styles.incrementButton, { marginLeft: 5 }]} onPress={memoizedIncrement}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.button} onPress={memoizedAddToCart}>
                    <Text style={styles.buttonText}>Add To Cart</Text>
                </TouchableOpacity>
            )}
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ddd',
        borderRadius: 8,
        // marginVertical: 8,
    },
    leftContainer: {
        flex: 0.3,
        marginRight: 14,
    },
    leftImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    centerContainer: {
        flex: 0.5,
    },
    heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: COLORS.dark,
    },
    subHeading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'italic',
        color: COLORS.text,
        marginBottom: 4,
    },
    offerBox: {
        width: 100,
        backgroundColor: COLORS.Offer_box,
        padding: 2,
        borderRadius: 6,
        alignItems: "center"
    },
    offerText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: COLORS.status_cancelled,
    },
    rightContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    topPrice: {
        color: COLORS.dark,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: .5,

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Center the count between the buttons
        gap: 4
    },
    incrementButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 11,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 2,
    },
    countText: {
        justifyContent: 'center',
        textAlign: 'center',
        minWidth: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.dark


    },
});

export default memo(CustomItemCard);
