import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
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
import Animated from 'react-native-reanimated'
import CartItemCard from '../../components/cartItemCard'
const Cart = ({ navigation, route }) => {

  const { cartItems, setCartItems, } = useContext(CartContext);
  const [clean, setClean] = useState(null)

  const { cart_id } = route.params;

 


  const { mutate, data, isLoading, refetch } = useMutation({
    mutationKey: 'cartItems',
    mutationFn: getCartItems,
    onSuccess: (data) => {
      setClean(true)
      let myStructure = data?.data?.data?.product.map((res) => (
        {
          _id: res?._id,
          qty: res?.qty,
          unit_id :res?.unit?.id,
          varientname:res?.variant?.name, 
          item: { ...res }
        }
      ))
      setCartItems(myStructure)
    }
  });



  const { mutate: MutatePostAddCart, refetch: addtoCartFetch } = useMutation({
    mutationKey: 'addToCart_query',
    mutationFn: PostAddToCart,
    onSuccess: (data) => {
      let myStructure = data?.data?.data?.product.map((res) => (
        {
          _id: res?._id,
          qty: res?.qty,
          unit_id :res?.unit?.id,
          varientname:res?.variant?.name, 
          item: { ...res }
        }
      ))
      setCartItems(myStructure)

    }
  })


  useEffect(() => {
    if (cart_id) {
      mutate({ cartId: cart_id })

    }
    return () => {
 
      // // cancel the subscription
      if (!clean) {
        setClean(1); // Set clean to 1 to prevent further calls

        const updatedData = cartItems.map(item => ({
          ...item.item,
          qty: item.qty
        }));
        MutatePostAddCart({ product: updatedData });
      }
    };
  
  }, [cart_id])

  const noProductsAdded = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
      </View>
    )
  }

  const editAddress = () => {
    navigation.navigate('EditAddress')
  }

  const renderItem = useCallback(({ item, index }) => {
    return (
      <>
        <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
          <CartItemCard key={index} item={item} />
        </View>
      </>
    )
  }, [data?.data?.data, cartItems])

  const ListEmptyCompont = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../../images/cart.png')} style={styles.emptyCart} />
      </View>
    )
  }, [])


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
  }
})