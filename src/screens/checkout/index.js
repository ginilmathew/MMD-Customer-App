import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SubHeading from '../../components/SubHeading'
import CommonButton from '../../components/CommonButton'
import { useNavigation } from '@react-navigation/native'
import reactotron from 'reactotron-react-native'
import CartContext from '../../context/cart'
import { useMutation, useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import { PosttoCheckout } from '../../api/checkoutData'
import { PlaceOrder } from '../../api/PlaceOrder'
import moment from 'moment'
import { storage } from '../../../App'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { RAZORPAY_KEY } from '../../constants/API'
import RazorpayCheckout from 'react-native-razorpay';
import ChooseDate from './ChooseDate'


const Checkout = ({ route }) => {

  const [user] = useMMKVStorage('user', storage);
  const [cart_id] = useMMKVStorage('cart_id', storage);



  const { item, cart_ID } = route?.params;



  // reactotron.log(cart_ID, "cart_ID")

  const { cartItems, setCartItems } = useContext(CartContext);

  reactotron.log(cartItems, "cartItems")

  const navigation = useNavigation();

  const [radioBtnStatus, stRadioBtnStatus] = useState(0);

  let payload = {
    cart_id: cart_ID
  }

  let today = new Date();

  reactotron.log(today, "today")

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Checkout'],
    //retry: false,
    queryFn: () => PosttoCheckout(
      payload
    ),
    //enabled: false
  })

  useRefetch(refetch)

  const { mutate, refetch: postsubrefetch } = useMutation({
    mutationKey: 'placedOrder',
    mutationFn: PlaceOrder,
    onSuccess: async (data) => {
      setCartItems([])
      await storage.getStringAsync('cart_id', 'null');

    },
    onError: () => {

    },
    onSettled: () => {
      reactotron.log('CART CALLED')
      setCartItems([])
      navigation.navigate('OrderPlaced', { item: data?.data?.data })
   
    }


  })





  const checkBox = (num) => (
    <TouchableOpacity onPress={() => stRadioBtnStatus(num)}>
      <Ionicons name={radioBtnStatus === num ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
    </TouchableOpacity>
  )

  const handlePayment = () => {
    var options = {
      description: '',
      image: 'https://mmdcartadmin.diginestsolutions.in/static/media/logo.5a3a4acf9425f0097cef.png',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: data?.data?.data?.total * 100,
      name: 'DG Cart',
      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: user?.user?.email,
        contact: user?.user?.mobile,
        name: user?.user?.name
      },
      theme: { color: '#53a20e' }
    }
    RazorpayCheckout.open(options).then((data) => {
      navigation.navigate('Processing')
      placeOrder()
      //alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      //alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  const placeOrder = () => {

    mutate({
      itemDetails: cartItems,
      billingAddress: item?.area?.address,
      shippingAddress: item?.area?.address,
      orderDate: moment(today).format("DD-MM-YYYY"),
      subTotal: data?.data?.data?.subtotal,
      discount: 0,
      tax: data?.data?.data?.tax,
      total: data?.data?.data?.total,
      paymentType: radioBtnStatus === 0 ? "cod" : "online",
      paymentStatus: radioBtnStatus === 0 ? "pending" : "completed",
      customer_id: user?.user?._id,
      cartId: cart_id
    })
  }

  const handlePlaceOrder = () => {
    if (radioBtnStatus === 0) {
      placeOrder()
    } else if (radioBtnStatus === 1) {
      handlePayment()
    }
  }


  return (
    <View style={styles.container}>
      <Header />
      <CommonHeader heading={"Checkout"} backBtn />
      <ScrollView contentContainerStyle={styles.innerContainer}>

        <View>
          {cartItems?.map(item => (<View style={styles.imgContainer} key={item?._id}>
            <View style={styles.boxStyle}>
              <Image source={{ uri: item?.item?.imageBasePath + item?.item?.image?.[0] }} style={styles.imgStyle} />
              <View style={styles.imgSection}>
                <Text style={styles.productName}>{item?.item?.name}</Text>
                <Text style={styles.categoryName}>Category : {item?.item?.category?.name}</Text>
              </View>
            </View>
            <View style={styles.qtyBox}>
              <Text style={styles.price}>₹ {(item?.item?.variant?.offerPrice && item?.item?.variant?.offerPrice < item?.item?.variant?.sellingPrice) ? (item?.item?.variant?.offerPrice) : (item?.item?.variant?.sellingPrice)}</Text>
            </View>
          </View>
          ))}

          <View style={styles.locationBox}>
            <View style={styles.shipping}>
              <Text style={styles.heading}>Shipping Address</Text>
              {/* <TouchableOpacity>
                <Text style={styles.edit}>EDIT</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.locationStyle}>
              <Ionicons name="location" size={30} color={COLORS.blue} />
              <Text style={styles.description}>{item?.area?.address}</Text>
            </View>
          </View>

          <View style={styles.payBox}>
            <SubHeading label={"Delivery Slots"} />
            <View style={{ gap: 8, marginVertical: 10 }}>
              <View style={styles.checkbox}>
                {/* <Text style={styles.common}>DATE GOES HERE</Text> */}
                <ChooseDate />
              </View>
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
                <Text style={styles.priceBox}>₹ {data?.data?.data?.subtotal}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>GST</Text>
                <Text style={styles.priceBox}>₹ {data?.data?.data?.tax}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>Delivery Charge</Text>
                <Text style={styles.priceBox}>₹ {data?.data?.data.deliveryCharge}</Text>
              </View>
              <View style={styles.containerTwo}>
                <Text style={styles.textStyle}>Grand Total</Text>
                <Text style={styles.priceBox}>₹ {data?.data?.data?.total}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 22, marginTop: 20 }}>
          <CommonButton text={"Place Order"} onPress={handlePlaceOrder} />
        </View>

      </ScrollView>
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