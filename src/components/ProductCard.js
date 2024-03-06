import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import AddToCart from './AddToCart';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/COLORS';
import moment from 'moment';
import reactotron from '../ReactotronConfig';


const ProductCard = ({ item, key, time }) => {

    const styles = makeStyle(COLORS)


    const [quantity, setQuantity] = useState(0)
    const { addItemToCart, cartItems } = useContext(CartContext);
    const navigation = useNavigation()
    let products = item?.products ? item?.products[0] : item;
    const [price, setPrice] = useState(null)
    



    useEffect(() => {
        setQuantity(0)
        calculatePrice()
    }, [time])


    const calculatePrice = useCallback(async () => {
        if(cartItems){
            let carts = [...cartItems];

            let quanti = carts?.find(cart => cart?._id === products?._id && cart?.unit?.id === products?.units?.[0]?.id && products?.units?.[0]?.variants?.[0]?.name === cart?.variant?.name)
    
            if (quanti) {
                setQuantity(quanti?.qty)
            }
        }
        else{
            setQuantity(0)
        }
        

        let variant = products?.units[0]?.variants?.[0];

        let price;
        let tax = products?.subcategories?.tax ? products?.subcategories?.tax : products?.categories?.tax
        const { offerPrice, fromDate, toDate, sellingPrice, costPrice } = variant

        if (fromDate && toDate && offerPrice) {
            let startDate = moment(`${moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD")} 00:00:00`, "YYYY-MM-DD HH:mm:ss");
            let endDate = moment(`${moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD")} 23:59:59`, "YYYY-MM-DD HH:mm:ss");
            if (moment().isBetween(startDate, endDate)) {
                price = {
                    ...variant,
                    finalPrice: offerPrice,
                    hasOfferPrice: true,
                    discount: parseFloat(sellingPrice) - parseFloat(offerPrice),
                    discountPercentage: (100 * (parseFloat(sellingPrice) - parseFloat(offerPrice)) / parseFloat(sellingPrice)).toFixed(2) * 1,
                    unitName: products?.units[0]?.name,
                    tax,
                    taxValue: (offerPrice / 100) * tax
                }
            }
            else {
                price = {
                    ...variant,
                    finalPrice: sellingPrice,
                    hasOfferPrice: false,
                    discount: 0,
                    discountPercentage: (100 * (parseFloat(sellingPrice) - parseFloat(offerPrice)) / parseFloat(sellingPrice)).toFixed(2) * 1,
                    unitName: products?.units[0]?.name,
                    tax,
                    taxValue: (sellingPrice / 100) * tax
                };
            }
        }
        else {

            price = {
                ...variant,
                finalPrice: sellingPrice,
                hasOfferPrice: false,
                discount: 0,
                discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                unitName: products?.units[0].name,
                tax,
                taxValue: (sellingPrice / 100) * tax
            };

        }

        setPrice(price)

    }, [cartItems,item])




    const NavigateToSingleProduct = useCallback(() => {
        navigation.navigate('SingleProduct', { item: item?.products ? item?.products?.[0] : item , quantity })
    }, [item, quantity])

    useEffect(() => {
        if (products && price) {
            const { description, details, image, imageBasePath, status, units, updated_at, created_at, featuredList, variants, categories, subcategories, unit, ...other } = products
            const { finalPrice, tax, taxValue, costPrice } = price;
            let productObj = {
                ...other,
                unit: {
                    id: units?.[0]?.id,
                    name: units?.[0]?.name
                },
                variant: units?.[0]?.variants?.[0],
                qty: quantity,
                price: finalPrice,
                image: `${imageBasePath}${image[0]}`,
                tax,
                taxValue,
                total: finalPrice * 1 + taxValue * 1,
                costPrice
                //tax: 
            }

            addItemToCart(productObj)
        }
    }, [quantity, price, products])


    const addQuantity = () => {
        setQuantity(qty => qty + 1)
    }

    const removeQuantity = () => {
        setQuantity(qty => qty - 1)
    }


    const AnimatedStyle = FadeInDown.easing().delay(300);

    //setPrice(price)


    return (
        <Animated.View entering={AnimatedStyle} key={key}>
            <TouchableOpacity onPress={NavigateToSingleProduct} style={styles?.container}>
                {/* Left Side */}
                <Animated.View style={styles?.leftContainer}>
                    <Animated.Image
                        source={{ uri: products?.imageBasePath + products?.image?.[0] }}
                        style={styles.leftImage}
                    //sharedTransitionTag={item?.product_id}
                    />

                </Animated.View>

                {/* Center Content */}
                <View style={styles.centerContainer}>
                    <View>
                        <Text style={styles?.heading}>{products?.name}</Text>
                        <Text style={styles.subHeading}>Category: {products?.category?.name}</Text>
                        <Text style={styles.subHeading}>{`${price?.name} ${price?.unitName}`}</Text>
                    </View>
                    {price?.hasOfferPrice && <View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to {price?.discountPercentage}% off!</Text>
                    </View>}
                </View>

                {/* Right Side */}
                <View style={styles?.rightContainer}>
                    <Text style={styles.topPrice}>₹ {quantity ? parseFloat(price?.finalPrice) * parseInt(quantity) : price?.finalPrice}</Text>
                    {price?.hasOfferPrice &&
                        <Text style={styles.strikePrice}>₹ {quantity ? parseFloat(price?.sellingPrice) * parseInt(quantity) : price?.sellingPrice}</Text>}
                    <AddToCart
                        isCartAdded={quantity > 0 ? true : false}
                        handleAddToCart={addQuantity}
                        handleDecrement={removeQuantity}
                        handleIncrement={addQuantity}
                        quantity={quantity} />
                </View>
            </TouchableOpacity>

        </Animated.View>
    )
}

export default memo(ProductCard) 

const makeStyle = (color) => StyleSheet.create({
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
        width: 90,
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
        flex: 0.4,
        alignItems: 'flex-end',
    },
    topPrice: {
        color: COLORS.light,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    button: {
        backgroundColor: color.primary,
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
        gap: 4,
    },
    incrementButton: {
        backgroundColor: color.primary,
        width: 27,
        height: 27,
        borderRadius: 6,

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
})