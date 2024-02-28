import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CartContext from '../context/cart';
import AddToCart from './AddToCart';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const CartCard = ({ item, increaseQuantity, decreaseQuantity, key, removeItem }) => {

    const styles = makeStyle(COLORS)

    const { cartItems } = useContext(CartContext);

    const AnimatedStyle = FadeInDown.easing().delay(300);

    const addQuantity = () => {
        increaseQuantity(item)
    }

    const removeQuantity = () => {
        decreaseQuantity(item)
    }

    const RemoveCart = () => {
        removeItem(item)
    }

    const renderRightActions = () => {
        return (
            <Animated.View style={styles.swipedRow}>
                {/* <View style={styles.swipedConfirmationContainer}>
              <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
            </View> */}

                <TouchableOpacity style={[styles.swipeDeleteContainer]} onPress={RemoveCart}>
                    <MaterialIcons name='delete' color={COLORS.red} size={23} />
                </TouchableOpacity>

            </Animated.View>
        );
    };



    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Animated.View entering={AnimatedStyle} key={key}>

                <TouchableOpacity activeOpacity={0.9} style={styles.container}>
                    {/* Left Side */}
                    <Animated.View style={styles.leftContainer}>
                        <Animated.Image
                            source={{ uri: item?.image }}
                            style={styles.leftImage}
                            sharedTransitionTag={item?._id}
                        />

                    </Animated.View>

                    {/* Center Content */}
                    <View style={styles.centerContainer}>
                        <Text style={styles.heading}>{item?.name}</Text>
                        <Text style={styles.subHeading}>Category: {item?.category?.name}</Text>
                        <Text style={styles.subHeading}>{`${item?.variant?.name} ${item?.unit?.name}`}</Text>
                        {/* {price?.hasOfferPrice ? (<View style={styles.offerBox}>
                        <Text style={styles.offerText}>Up to 10% off!</Text>
                    </View>) : null} */}
                    </View>

                    {/* Right Side */}
                    <View style={styles.rightContainer}>
                        <Text style={styles.topPrice}>₹ {parseFloat(item?.price) * parseInt(item?.qty)}</Text>
                        {/* {price?.hasOfferPrice &&
                    <Text style={styles.strikePrice}>₹ {parseFloat(item?.sellingPrice) * parseInt(cartItem.qty)}</Text>} */}
                        <AddToCart
                            isCartAdded={true}
                            handleDecrement={removeQuantity}
                            handleIncrement={addQuantity}
                            quantity={item?.qty} />
                    </View>
                </TouchableOpacity>

            </Animated.View>
        </Swipeable>
    )
}



export default CartCard

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
    },
    swipedRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    swipeDeleteContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});