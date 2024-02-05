import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SubHeading from '../../components/SubHeading'
import CommonButton from '../../components/CommonButton'
import { useNavigation } from '@react-navigation/native'


const Checkout = () => {

  const navigation = useNavigation();

  const [radioBtnStatus, stRadioBtnStatus] = useState(0);

  const checkBox = (num) => (
    <TouchableOpacity onPress={() => stRadioBtnStatus(num)}>
      <Ionicons name={radioBtnStatus === num ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
    </TouchableOpacity>
  )

  const placeOrder = () => {
    if( radioBtnStatus === 0) {
      navigation.navigate('OrderPlaced', {item : radioBtnStatus})
    } else if ( radioBtnStatus === 1) {
      //RazorPay//
    }
  }



  return (
    <View style={styles.container}>
      <Header />
      <CommonHeader heading={"Checkout"} backBtn />
      <View style={styles.innerContainer}>

        <View>
          <View style={styles.imgContainer}>
            <View style={styles.boxStyle}>
              <Image source={require('../../images/propic.jpg')} style={styles.imgStyle} />
              <View style={styles.imgSection}>
                <Text style={styles.productName}>Elite Premium Rice Puttupodi 1Kg Pouch</Text>
                <Text style={styles.categoryName}>Category : Grocery</Text>
              </View>
            </View>
            <View style={styles.qtyBox}>
              <Text style={styles.price}>₹100.50</Text>
            </View>
          </View>

          <View style={styles.locationBox}>
            <View style={styles.shipping}>
              <Text style={styles.heading}>Shipping Address</Text>
              {/* <TouchableOpacity>
                <Text style={styles.edit}>EDIT</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.locationStyle}>
              <Ionicons name="location" size={30} color={COLORS.blue} />
              <Text style={styles.description}>Technopark Trivandrum, Nila Building, Module 011, Ground floor, Kazhakkoottam, Kerala 695581</Text>
            </View>
          </View>

          <View style={styles.payBox}>
            <SubHeading label={"Payment Method"} />
            <View style={{ gap: 8, marginVertical: 10 }}>
              <View style={styles.checkbox}>
                {checkBox(0)}
                <Text style={styles.common}>COD</Text>
              </View>
              <View style={styles.checkbox}>
                {checkBox(1)}
                <Text style={styles.common}>Online/Netbanking/Upi</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>Sub-Total</Text>
                <Text style={styles.priceBox}>₹100.50</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>GST</Text>
                <Text style={styles.priceBox}>₹10.00</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>Delivery Charge</Text>
                <Text style={styles.priceBox}>₹30.00</Text>
              </View>
              <View style={styles.containerTwo}>
                <Text style={styles.textStyle}>Grand Total</Text>
                <Text style={styles.priceBox}>₹140.50</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 22 }}>
          <CommonButton text={"Place Order"} onPress={placeOrder}/>
        </View>

      </View>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  innerContainer: {
    paddingTop: 5,
    paddingBottom: 25,
    flex: 1,
    justifyContent: "space-between"
  },
  imgContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22
  },
  imgStyle: {
    width: 80,
    height: 80,
    borderRadius: 12
  },
  imgSection: {
    width: "57%"
  },
  productName: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.light,
    marginLeft: 10
  },
  categoryName: {
    fontFamily: "Poppins-Italic",
    fontSize: 10,
    color: COLORS.light,
    opacity: 0.5,
    marginLeft: 10
  },
  boxStyle: {
    flexDirection: "row"
  },
  price: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.light,
  },
  qty: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: COLORS.light,
  },
  qtyBox: {
    justifyContent: "center"
  },
  locationBox: {
    backgroundColor: "#F5F5F5",
    marginVertical: 15,
    paddingHorizontal: 22,
    paddingVertical: 10
  },
  heading: {
    fontFamily: "Poppins-Medium",
    fontSize: 15
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 12
  },
  locationStyle: {
    flexDirection: "row",
    width: 325,
    gap: 5,
    marginTop: 8
  },
  payBox: {
    paddingHorizontal: 22,
  },
  common: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.light
  },
  checkbox: {
    flexDirection: 'row',
    gap: 5,
    alignItems: "center"
  },
  totalContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 12,
    gap: 3
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subBox: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.light
  },
  priceBox: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: COLORS.light
  },
  textStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.light
  },
  containerTwo: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  edit: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: COLORS.primary
  },
  shipping: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  }
})