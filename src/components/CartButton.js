import { View, Text } from 'react-native'
import React, { useCallback, useContext } from 'react'
import CartContext from '../context/cart';

const CartButton = () => {

    const { cartItems, addToCart, incrementItem, decrementItem } = useContext(CartContext);

    const isCartAdded = cartItems.some(cartItem => cartItem._id === products._id);
    const cartItem = cartItems.find(cartItem => cartItem._id === products._id);

    const handleAddToCart = useCallback(() => {
        addToCart(products);
    }, [addToCart, products]);

    const handleIncrement = useCallback(() => {
        incrementItem(products);
    }, [incrementItem, products._id]);

    const handleDecrement = useCallback(() => {
        decrementItem(products);
    }, [decrementItem, products._id]);



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
}

export default CartButton