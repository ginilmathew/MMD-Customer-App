import { StyleSheet } from 'react-native';
import React, { useState, useMemo } from 'react';
import CartContext from './index';
import { storage } from '../../../App';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import moment from 'moment';

const CartProvider = ({ children }) => {


    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0)

    const addItemToCart = async(item) => {
        //let carts = [...cartsDatas]

        //let cartss = await storage.getArrayAsync("cart")
        let carts = [...cartItems]
        
        let exists = await carts?.findIndex(cart => cart?._id === item?._id && cart?.unit?.id === item?.unit?.id && item?.variant?.name === cart?.variant?.name);

        if(exists > -1){
            if(item?.qty === 0){
                carts?.splice(exists, 1);
            }
            else{
                carts[exists] = item
            }
            setCartItems(carts)
            //await storage.setArrayAsync("cart", carts);
            //setCartChages(moment().unix())
            //setCartDatas(cartsDatas)
        }
        else{
            //setCartDatas([...cartsDatas, item])
            if(item?.qty > 0){
                setCartItems([...carts, item])
                //await storage.setArrayAsync("cart", [...carts, item]);
                //setCartChages(moment().unix())
            }
            
        }

        let total = cartItems?.reduce((total, item) => total + parseInt(item.qty) + parseFloat(item?.price), 0)
        //if(total === 0){
            setCartTotal(moment().unix())
        //}
        
    }




 

    const addToCart = ({ _id: itemId, ...items }) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems?.find((item) => item._id === itemId);
            if (existingItem) {
                // If item is already in the cart, update the count  
                return prevItems?.map((item) =>
                    item?._id === itemId ? { item, qty: item?.qty + 1 } : item
                );
            } else {
                const { variants, ...unitWithoutVariants } = { ...items?.units[0] };
                // delete items.units

                let item = {
                    _id: itemId,
                    qty: 1,
                    ...items,
                    image: Array.isArray(items?.image[0]) ? items?.image[0] : items?.image,
                    unit: unitWithoutVariants,
                    variant: variants[0]
                };


                // If item is not in the cart, add it

                return [...prevItems, {
                    _id: itemId, qty: 1, unit_id: unitWithoutVariants?.id,
                    varientname: variants[0]?.name, item
                }];
            }
        });
    };

    const incrementItem = ({ _id: itemId, }) => {
        setCartItems((prevItems) =>
            prevItems?.map((item) => {
                let items = {
                    ...item,
                    item: { ...item?.item }
                }
                return item?._id === itemId ? { ...items, qty: item?.qty + 1 } : items
            })
        );
    };


    const decrementItem = ({ _id: itemId }) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems?.map((item) => {
                let items = {
                    ...item,
                    item: { ...item?.item, }
                }
                return item._id === itemId ? { ...items, qty: Math.max(item.qty - 1, 0) } : items
            });

            // Filter out items with count > 0
            return updatedItems?.filter((item) => item.qty > 0);
        });
    };

    const DeleteItem = ({ _id: itemId }) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems?.map((item) => {
                let items = {
                    ...item,
                    item: { ...item?.item, qty: Math.max(item.qty - 1, 0) }
                }
                return item._id === itemId ? { ...items, qty: Math.max(item.qty - 1, 0) } : items
            });
            let find = updatedItems?.find((res) => res?.qty === 0);
            let final = updatedItems?.filter((res) => res?._id !== find?._id);
            return final
        });
    };



    const contextValue = useMemo(() => {

        return {
            setCartItems,
            cartItems,
            addToCart,
            incrementItem,
            decrementItem,
            DeleteItem,
            addItemToCart,
            cartTotal
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
