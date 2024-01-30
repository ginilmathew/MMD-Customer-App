import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import { COLORS } from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import ItemCard from '../../components/ItemCard'

const Cart = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CommonHeader heading={"Cart"} backBtn />
      {/* <View style={styles.emptyContainer}>
        <Image source={require('../../images/cart.png')} style={styles.emptyCart}/>
      </View> */}
      <View style={styles.innerContainer}>
        <ItemCard />
        <CommonButton text={"Checkout"} mt={30}/>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  innerContainer: {
    paddingHorizontal: 20,
    marginTop: 15
  },
  emptyContainer: {
    flex: 0.8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCart: {
    width: 251,
    height: 318
  }
})