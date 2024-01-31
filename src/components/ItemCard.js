import React, { memo, useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';

const CustomItemCard = ({ onPress, item, key }) => {
   
    const { cartItems, addToCart, incrementItem, decrementItem } = useContext(CartContext);

    const isCartAdded = cartItems.some(cartItem => cartItem.id === item.id);
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);

    const handleAddToCart = useCallback(() => {
        addToCart(item.id);
    }, [addToCart, item.id]);

    const handleIncrement = useCallback(() => {
        incrementItem(item.id);
    }, [incrementItem, item.id]);

    const handleDecrement = useCallback(() => {
        decrementItem(item.id);
    }, [decrementItem, item.id]);


  

    return (
        <Animated.View entering={FadeInDown.easing().delay(300)} key={key}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    {/* Left Side */}
                    <View style={styles.leftContainer}>
                        <Image
                            source={require('../images/spinach.jpg')}
                            style={styles.leftImage}
                        />
                    </View>

                    {/* Center Content */}
                    <View style={styles.centerContainer}>
                        <Text style={styles.heading}>Elite Premium Rice puttupodi 1kg </Text>
                        <Text style={styles.subHeading}>Category: Grocery</Text>
                        <View style={styles.offerBox}>
                            <Text style={styles.offerText}>Up to 10% off!</Text>
                        </View>
                    </View>

                    {/* Right Side */}
                    <View style={styles.rightContainer}>
                        <Text style={styles.topPrice}>₹200</Text>
                        {isCartAdded ? (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.incrementButton} onPress={handleDecrement}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.countText}>{cartItem.count}</Text>
                                <TouchableOpacity style={[styles.incrementButton,{marginLeft:5}]} onPress={handleIncrement}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                                <Text style={styles.buttonText}>Add To Cart</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

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
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 6,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Center the count between the buttons
        gap:5
    },
    incrementButton: {
        backgroundColor: COLORS.primary,
        padding: 6,
        borderRadius: 8,
        marginRight: 5,
    },
    countText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
       

    },
});

export default memo(CustomItemCard);
