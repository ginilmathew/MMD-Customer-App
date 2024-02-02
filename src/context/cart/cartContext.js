import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import CartContext from './index';

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = ({ _id: itemId, ...items }) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === itemId);

            if (existingItem) {
                // If item is already in the cart, update the count
                return prevItems.map((item) =>
                    item.id === itemId ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                // If item is not in the cart, add it
                // console.log(items.products[0].categories.image);
                // console.log(items.products[0].units[0]?.variants);
                return [...prevItems, { id: itemId, qty: 1, ...{ image: items.products[0].imageBasePath + items.products[0].image, ...items } }];
            }
        });
    };

    const incrementItem = ({ _id: itemId }) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                return item.id === itemId ? { ...item, qty: item.qty + 1 } : item
            })
        );
    };

    const decrementItem = ({ _id: itemId }) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === itemId ? { ...item, qty: Math.max(item.qty - 1, 0) } : item
            );

            // Filter out items with count > 0
            return updatedItems.filter((item) => item.qty > 0);
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
