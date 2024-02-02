import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import CartContext from './index';
import reactotron from 'reactotron-react-native';

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemId) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === itemId);

            if (existingItem) {
                // If item is already in the cart, update the count
                return prevItems.map((item) =>
                    item.id === itemId ? { ...item, count: item.count + 1 } : item
                );
            } else {
                // If item is not in the cart, add it
                return [...prevItems, { id: itemId, count: 1 }];
            }
        });
    };

    const incrementItem = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    const decrementItem = (itemId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
            );

            // Filter out items with count > 0
            return updatedItems.filter((item) => item.count > 0);
        });
    };

    const contextValue = useMemo(() => {
        return {
            cartItems,
            addToCart,
            incrementItem,
            decrementItem,
        };
    }, [cartItems]); // Re-create the context value only when cartItems change

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

const styles = StyleSheet.create({});
