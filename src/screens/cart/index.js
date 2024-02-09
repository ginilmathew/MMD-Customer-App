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
import Animated, { interpolate, Extrapolate, clamp } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipable from '../../components/swipable'

const Cart = ({ navigation, route }) => {

  const { cartItems, setCartItems, } = useContext(CartContext);
  const [clean, setClean] = useState(false)

  const { cart_id } = route.params;



  const { mutate, data, isLoading, refetch } = useMutation({
    mutationKey: 'cartItems',
    mutationFn: getCartItems,
    onSuccess: (data) => {
      setClean(true)
      let myStructure = data?.data?.data?.product?.map((res) => (
        {
          _id: res?._id,
          qty: res?.qty,
          unit_id: res?.unit?.id,
          varientname: res?.variant?.name,
          item: { ...res }
        }
      ))
      setCartItems(myStructure)
    }
  });



  const { mutate: MutatePostAddCart, refetch: addtoCartFetch } = useMutation({
    mutationKey: 'addToCart_query',
    mutationFn: PostAddToCart,

    onSuccess: async (data) => {
      let myStructure = data?.data?.data?.product.map((res) => (
        {
          _id: res?._id,
          qty: res?.qty,
          unit_id: res?.unit?.id,
          varientname: res?.variant?.name,
          item: { ...res }
        }
      ))
      setCartItems(myStructure)
      await storage.setStringAsync('cart_id', data?.data?.data?._id);
      navigation.navigate('EditAddress', { cartID: cart_id })
    }
  })


  useEffect(() => {
    if (cart_id) {
      mutate({ cartId: cart_id })

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

  const noProductsAdded = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
      </View>
    )
  }

  const editAddress = () => {
    const updatedData = cartItems?.map(item => ({
      ...item.item,
      qty: item.qty
    }));
    MutatePostAddCart({ product: updatedData, cartid: cart_id });

  }

  const renderItem = useCallback(({ item, index }) => {
    return (

      <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
        {/* <Swipable> */}
          <CartItemCard key={index} item={item} />
        {/* </Swipable> */}

      </View>

    )
  }, [data?.data?.data ?? [], cartItems ?? []])

  // const ListEmptyCompont = useCallback(()=>{
  //   return (
  //  <View style={styles.emptyContainer}>
  //         <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
  //       </View> 
  //   )
  // },[])



  const renderRightActions = ({ ...props }) => {

    reactotron.log({ ...props })
    const opacity = interpolate(props.dragAnimatedValue, {
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    reactotron.log({ opacity })
    // Ensure dragAnimatedValue is not NaN
    // const opacity = interpolate(dragAnimatedValue, {
    //   inputRange: [-150, 0],
    //   outputRange: [1, 0],
    //   extrapolate: 'clamp',
    // });

    return (
      <Animated.View style={styles.swipedRow}>
        <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View>
        <Animated.View style={[styles.deleteButton]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };



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


  return (
    <View style={styles.container}>
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
        />

        {cartItems?.length > 0 ? (<View style={styles.innerContainer}>
          <CommonButton text={"Checkout"} onPress={editAddress} />
        </View>) : null}
      </View>

    </View >
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
  swipedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  swipedConfirmationContainer: {
    marginRight: 10,
  },
  deleteConfirmationText: {
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
})