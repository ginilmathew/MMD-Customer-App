import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import { useNavigation } from '@react-navigation/core';
import reactotron from 'reactotron-react-native';

const CustomItemCard = ({ onPress, item, key }) => {

    const navigation = useNavigation()
    let products = item.products ? item.products[0] : item;


    // const [price, setPrice] = useState({ sellingPrice: null, offerPrice: null, costPrice: null })

    const { cartItems, addToCart, incrementItem, decrementItem } = useContext(CartContext);
    let unitID = products?.units[0]?.id;
    let varientName = products?.units[0]?.variants?.[0]?.name;

    // reactotron.log({unitID})
    // reactotron.log({varient})

    const isCartAdded = cartItems.some(cartItem => (cartItem._id === products._id && cartItem?.unit_id === unitID && cartItem?.varientname === varientName));
    const cartItem = cartItems.find(cartItem =>(cartItem._id === products._id && cartItem?.unit_id === unitID && cartItem?.varientname === varientName));

    const handleAddToCart = useCallback(() => {
        addToCart(products);
    }, [addToCart, products]);

    const handleIncrement = useCallback(() => {
        incrementItem(products);
    }, [incrementItem, products._id]);

    const handleDecrement = useCallback(() => {
        decrementItem(products);
    }, [decrementItem, products._id]);

    const NavigateToSingleProduct = useCallback(() => {
        navigation.navigate('SingleProduct', { item: item.products ? item?.products?.[0] : item })
    }, [navigation])



    // TouchableOpacity onPress={NavigateToSingleProduct}

    // useEffect(() => {
    //     if (item) {
    //         let products = item.products ? item.products[0].units[0].variants.map(item => (
    //             item
    //         )) : item?.units?.[0]?.variants?.map(item => (
    //             item
    //         ));

    //         let productsWithOffer = products.filter(product => product.offerPrice !== null);

    //         // If there are products with offer prices, find the one with the lowest offer price
    //         if (productsWithOffer.length > 0) {
    //             let lowestOfferProduct = productsWithOffer.reduce((prev, current) => {
    //                 return parseFloat(prev.offerPrice) < parseFloat(current.offerPrice) ? prev : current;
    //             });
    //             setPrice({
    //                 sellingPrice: lowestOfferProduct?.sellingPrice,
    //                 offerPrice: lowestOfferProduct?.offerPrice === "" ? null : lowestOfferProduct?.offerPrice,
    //                 costPrice: lowestOfferProduct?.costPrice
    //             });
    //         } else {
    //             // If there are no products with offer prices, find the one with the lowest selling price
    //             let lowestSellingProduct = products.reduce((prev, current) => {
    //                 return parseFloat(prev.sellingPrice) < parseFloat(current.sellingPrice) ? prev : current;
    //             });
    //             setPrice({
    //                 sellingPrice: lowestSellingProduct?.sellingPrice,
    //                 offerPrice: lowestSellingProduct?.offerPrice === "" ? null : lowestSellingProduct?.offerPrice,
    //                 costPrice: lowestSellingProduct?.costPrice
    //             });
    //         }
    //     }
    // }, [item])




    const AnimatedStyle = FadeInDown.easing().delay(300);


    return (
        <Animated.View entering={AnimatedStyle} key={key}>
            <TouchableOpacity onPress={NavigateToSingleProduct} style={styles.container}>
                {/* Left Side */}
                <Animated.View style={styles.leftContainer}>
                    <Animated.Image
                        source={{ uri: products?.imageBasePath + products?.image?.[0] }}
                        style={styles.leftImage}
                        sharedTransitionTag={item?.product_id}
                    />

                </Animated.View>

                {/* Center Content */}
                <View style={styles.centerContainer}>
                    <Text style={styles.heading}>{products?.name}</Text>
                    <Text style={styles.subHeading}>Category: {products?.category?.name}</Text>
                    {products?.units[0]?.variants[0]?.offerPrice !== "" ? (<View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to 10% off!</Text>
                    </View>) : null}
                </View>

                {/* Right Side */}
                <View style={styles.rightContainer}>
                    <Text style={styles.topPrice}>₹ {products?.units[0]?.variants[0]?.offerPrice * 1 ? products?.units[0]?.variants[0]?.offerPrice : products?.units[0]?.variants[0]?.sellingPrice ?? 0}</Text>
                    {products?.units[0]?.variants[0]?.offerPrice &&
                        <Text style={styles.strikePrice}>₹ {products?.units[0]?.variants[0]?.sellingPrice ?? 0}</Text>}
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
                    <Text style={styles.countText}>{cartItem.qty}</Text>
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
        color: COLORS.light,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 4,
        paddingVertical: 7,
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
    strikePrice: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5,
        marginTop: -5,
        textDecorationLine: 'line-through',
    }
});

export default memo(CustomItemCard);
