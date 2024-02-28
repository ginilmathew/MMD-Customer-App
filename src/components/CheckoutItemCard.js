import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import COLORS from '../constants/COLORS';
import moment from 'moment';


const CheckoutItemCard = ({ item }) => {

    const [price, setPrice] = useState(null)
    let products = item.products ? item.products[0] : item?.item;

    const BASEURL = products?.imageBasePath ?? null;
    const IMAGE = products?.image?.[0];

    const getFinalPrices = () => {
        if (!products?.variant) {
            return null;
        }
        const { offerPrice, fromDate, toDate, sellingPrice, costPrice } = products.variant;

        let product;

        if (fromDate && toDate && offerPrice) {
            let startDate = moment(fromDate, "YYY-MM-DD").add(-1, 'day');
            let endDate = moment(toDate, "YYYY-MM-DD").add(1, 'day')
            if (moment().isBetween(startDate, endDate)) {
                product = {
                    ...products.variant,
                    finalPrice: offerPrice,
                    hasOfferPrice: true,
                    discount: parseFloat(sellingPrice) - parseFloat(offerPrice),
                    discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(offerPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                    unitName: products?.unit?.name
                }
            }
            else {
                product = {
                    ...products.variant,
                    finalPrice: sellingPrice,
                    hasOfferPrice: false,
                    discount: 0,
                    discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                    unitName: products?.unit?.name
                };
            }
        }
        else {
            product = {
                ...products.variant,
                finalPrice: sellingPrice,
                hasOfferPrice: false,
                discount: 0,
                discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                unitName: products?.unit?.name
            };
        }

        setPrice(product)
    };

    useEffect(() => {
        if (products?.variant) {
            getFinalPrices()
        }
    }, [products]);

    const { cartItems } = useContext(CartContext);



    const isCartAdded = cartItems?.some(cartItem => cartItem._id === products._id);


    const cartItem = cartItems?.find(cartItem => cartItem._id === products._id);

    const AnimatedStyle = FadeInDown.easing().delay(300);


    return (
        <Animated.View entering={AnimatedStyle}>
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
                    <Text style={styles.subHeading}>{`${price?.name} ${price?.unitName} * ${cartItem.qty}`}</Text>
                    {price?.hasOfferPrice ? (<View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to 10% off!</Text>
                    </View>) : null}
                </View>

                {/* Right Side */}
                <View style={styles.rightContainer}>
                <Text style={styles.topPrice}>₹ {parseFloat(price?.finalPrice) * parseInt(cartItem.qty)}</Text>
                {price?.hasOfferPrice &&
                    <Text style={styles.strikePrice}>₹ {parseFloat(price?.sellingPrice) * parseInt(cartItem.qty)}</Text>}
            </View>
            </TouchableOpacity>

        </Animated.View>
    )
}

export default CheckoutItemCard

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
