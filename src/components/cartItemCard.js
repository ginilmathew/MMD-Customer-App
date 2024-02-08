import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import { useNavigation } from '@react-navigation/core';
import reactotron from 'reactotron-react-native';

const CartItemCard = ({ onPress, item, key }) => {

    const navigation = useNavigation()
    const [price, setPrice] = useState(null)
    let products = item.products ? item.products[0] : item?.item;
    // let unitID = products?.unit.id;
    // let varientName = products?.variant?.name;
     
    // reactotron.log({unitID})
    // reactotron.log({varientName})


    const BASEURL = products?.imageBasePath ?? null;
    const IMAGE = products?.image?.[0];
    const getFinalPrices = () => {
        if (!products?.variant) {
            return null;
        }
        const { offerPrice, fromDate, toDate, sellingPrice } = products.variant;
        if (!offerPrice || isOfferExpired(fromDate, toDate)) {
            return { ...products.variant, finalPrice: sellingPrice, hasOfferPrice: false };
        }
        return { ...products.variant, finalPrice: offerPrice, hasOfferPrice: true };
    };
    const isOfferExpired = (fromDate, toDate) => {
        const currentDateString = new Date().toISOString().slice(0, 10);
        return fromDate > currentDateString || toDate < currentDateString;
    };
    useEffect(() => {
        if (products?.variant) {
            const finalPriceResult = getFinalPrices();
            let finalPriceProducts = [finalPriceResult]
            const lowestPriceProduct = finalPriceProducts?.reduce((lowest, current) => {
                // If both have offer prices, compare final prices
                if (current.hasOfferPrice && lowest.hasOfferPrice) {
                    return current.finalPrice < lowest.finalPrice ? current : lowest;
                }
                // If only one has an offer price, prioritize the offer price
                if (current.hasOfferPrice) {
                    return current;
                } else if (lowest.hasOfferPrice) {
                    return lowest;
                }
                // Otherwise, just compare final prices
                return current.finalPrice < lowest.finalPrice ? current : lowest;
            });
            if (lowestPriceProduct) {
                // console.log("Product with the lowest final price:", lowestPriceProduct);
                setPrice(lowestPriceProduct)
            } else {
                // console.log("There are no products in the finalPriceProducts array.");
            }
        }
    }, [products]);
       

    const { cartItems, addToCart, incrementItem, decrementItem ,DeleteItem} = useContext(CartContext);

  

    const isCartAdded = cartItems?.some(cartItem => cartItem._id === products._id);


    const cartItem = cartItems?.find(cartItem => cartItem._id === products._id);

    const handleAddToCart = useCallback(() => {
        addToCart(products);
    }, [addToCart,products]);

    const handleIncrement = useCallback(() => {
        incrementItem(products);
    }, [incrementItem, products._id]);

    const handleDecrement = useCallback(() => {
        DeleteItem(products);
    }, [decrementItem, products._id]);

    const NavigateToSingleProduct = useCallback(() => {
        navigation.navigate('SingleProduct', { item: item?.item })
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
            <TouchableOpacity activeOpacity={0.9} style={styles.container}>
                {/* Left Side */}
                <Animated.View style={styles.leftContainer}>
                {BASEURL && <Animated.Image
                        source={{ uri: BASEURL + IMAGE }}
                        style={styles.leftImage}
                        sharedTransitionTag={item?.product_id}
                    /> }
                    
                </Animated.View>

                {/* Center Content */}
                <View style={styles.centerContainer}>
                    <Text style={styles.heading}>{products?.name}</Text>
                    <Text style={styles.subHeading}>Category: {products?.category?.name}</Text>
                    {price?.hasOfferPrice ? (<View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to 10% off!</Text>
                    </View>) : null}
                </View>

                {/* Right Side */}
                <View style={styles.rightContainer}>
                <Text style={styles.topPrice}>₹ {price?.finalPrice}</Text>
                {price?.hasOfferPrice &&
                    <Text style={styles.strikePrice}>₹ {price?.sellingPrice}</Text>}
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
        borderRadius: 12,
    },
    centerContainer: {
        flex: 0.65,
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    heading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginBottom: 2,
        color: COLORS.light,
    },
    subHeading: {
        fontFamily: 'Poppins-Italic',
        fontSize: 10,
        color: COLORS.light,
        opacity: 0.5,
        marginBottom: 4,
    },
    offerBox: {
        width: 85,
        backgroundColor: COLORS.Offer_box,
        padding: 2,
        borderRadius: 6,
        alignItems: "center"
    },
    offerText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        color: COLORS.red,
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
        width: 80,
        height: 27,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        letterSpacing: .5,

    },
    addText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Center the count between the buttons
        gap: 4
    },
    incrementButton: {
        backgroundColor: COLORS.primary,
        width: 30,
        height: 27,
        borderRadius: 6,
        marginRight: 3,
        alignItems: "center",
        justifyContent: "center"
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

export default memo(CartItemCard);