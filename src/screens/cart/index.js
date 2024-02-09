import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import { COLORS } from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import ItemCard from '../../components/ItemCard'
import CartContext from '../../context/cart'
import reactotron from 'reactotron-react-native'
import { PostAddToCart, addToCart, getCartItems } from '../../api/cart'
import { useMutation, useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'

import CartItemCard from '../../components/cartItemCard'
import { storage } from '../../../App'
import LottieView from 'lottie-react-native'
import CartCard from '../../components/CartCard'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { set } from 'react-hook-form'



const Cart = ({ navigation, route }) => {

  const { cartItems, setCartItems, addItemToCart } = useContext(CartContext);
  const [time, setTime] = useState(moment().unix());









  // reactotron.log({animatedStyle: animatedStyle ?? null})


  useFocusEffect(
    useCallback(() => {
      setTime(moment().unix())
    }, [])
  )


  const [clean, setClean] = useState(false)



  const { cart_id } = route.params;



  const { mutate, data, isLoading, refetch } = useMutation({
    mutationKey: 'cartItems',
    mutationFn: getCartItems,
    onSuccess: (data) => {
      setClean(true)
      setCartItems(data?.data?.data?.product)
    }
  });



  const { mutate: MutatePostAddCart, refetch: addtoCartFetch } = useMutation({
    mutationKey: 'addToCart_query',
    mutationFn: PostAddToCart,

    onSuccess: async (data) => {
      // let myStructure = data?.data?.data?.product.map((res) => (
      //   {
      //     _id: res?._id,
      //     qty: res?.qty,
      //     unit_id: res?.unit?.id,
      //     varientname: res?.variant?.name,
      //     item: { ...res }
      //   }
      // ))
      //setCartItems(myStructure)
      await storage.setStringAsync('cart_id', data?.data?.data?._id);
      navigation.navigate('EditAddress', { cartID: data?.data?.data?._id })
    }
  })


  useEffect(() => {
    if (cart_id) {
      //mutate({ cartId: cart_id })

    }

  }, [cart_id])

  // useEffect(() => {
  //   return () => {
  //     if(cartItems?.length > 0 ){
  //       const updatedData = cartItems?.map(item => ({
  //         ...item.item,
  //         qty: item.qty
  //       }));
  //       console.log('ADDDD CART PAGE')
  //       MutatePostAddCart({ product: updatedData, cartid: cart_id });
  //     }

  //   }

  // }, [cartItems?.length])



  const removeItem = useCallback((item) => {
    reactotron.log({ item })

    reactotron.log({ cartItems })
    const filterData = cartItems?.filter(res => (res?._id && res?.unit?.id && res?.varient?.name) !== (item?._id && item?.unit.id && item?.varient?.name))
    reactotron.log({ filterData })

  }, [cartItems])

  const noProductsAdded = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
      </View>
    )
  }

  const editAddress = async () => {
    // const updatedData = cartItems?.map(item => ({
    //   ...item.item,
    //   qty: item.qty
    // }));
    let cartId = await storage.getStringAsync('cart_id');
    MutatePostAddCart({ product: cartItems, cartid: cartId });


  }

  const renderItem = ({ item, index }) => {
    return (

      <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
        <CartCard key={index} item={item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />
        {/* <CartItemCard key={index} item={item} /> */}
      </View>

    )
  }

  // const ListEmptyCompont = useCallback(()=>{
  //   return (
  //  <View style={styles.emptyContainer}>
  //         <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
  //       </View> 
  //   )
  // },[])






  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        justifyContent: 'center'
      }}>
        <LottieView source={require('../../lottie/cartLoader.json')} autoPlay loop style={{
          width: 400,
          height: 400
        }} />
      </View>
    )
  }


  const increaseQuantity = useCallback((item) => {
    //reactotron.log({cartItems})
    addItemToCart({
      ...item,
      qty: item?.qty + 1
    })
  }, [cartItems])

  const decreaseQuantity = useCallback((item) => {
    //reactotron.log({cartItems})
    addItemToCart({
      ...item,
      qty: item?.qty - 1
    })
  }, [cartItems])


  return (
    <GestureHandlerRootView style={styles.container}>
      <Header />
      <CommonHeader heading={"Cart"} backBtn />

      {/* <View style={styles.innerContainer}>
        <ItemCard /> 
        <CommonButton text={"Checkout"} mt={30}/>
      </View> */}

      <View style={{ paddingBottom: 200, marginTop: 10 }}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          refreshing={isLoading}
          onRefresh={refetch}
          maxToRenderPerBatch={10}
          windowSize={10}
          getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
          ListEmptyComponent={noProductsAdded}
          extraData={cartItems}
        />

        {cartItems?.length > 0 ? (<View style={styles.innerContainer}>
          <CommonButton text={"Checkout"} onPress={editAddress} />
        </View>) : null}
      </View>

    </ GestureHandlerRootView>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  innerContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    marginTop: 130,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCart: {
    width: 251,
    height: 318
  },

})