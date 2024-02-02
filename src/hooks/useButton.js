import { View, Text } from 'react-native'
import React from 'react'
import CartContext from '../context/cart';

const useButton = () => {
    const { cartItems, addToCart, incrementItem, decrementItem } = useContext(CartContext);


  return (
    <View>
      <Text>useButton</Text>
    </View>
  )
}

export default useButton