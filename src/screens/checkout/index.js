import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import COLORS from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SubHeading from '../../components/SubHeading'
import CommonButton from '../../components/CommonButton'
import { useNavigation } from '@react-navigation/native'
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
import SlotContext from '../../context/slot'
import { UpdateOrder } from '../../api/updateOrder'
import CheckoutCard from '../../components/CheckoutCard'
import NotificationContext from '../../context/notification'
import reactotron from 'reactotron-react-native'



const Checkout = ({ route }) => {

  const styles = makeStyle(COLORS)

  const [order_id] = useMMKVStorage('order_id', storage);
  const [user] = useMMKVStorage('user', storage);
  const [cart_id] = useMMKVStorage('cart_id', storage);
  const { useSlot, setUseSlot } = useContext(SlotContext);
  const [razorRes, setRazorRes] = useState("")
  const [orderData, setOrderData] = useState("")


  // const schema = yup.object({
  //   slot: yup.string().required('Delivery Slot is required'),
  //   slot_time: yup.object().nullable().required('Please select an option'),
  // })

  // const { control, handleSubmit, setError } = useForm({
  //   resolver: yupResolver(schema)
  // })



  const { item, cart_ID } = route?.params;

  const { cartItems, setCartItems } = useContext(CartContext);
  const { setCount } = useContext(NotificationContext);


  const navigation = useNavigation();

  const [radioBtnStatus, stRadioBtnStatus] = useState(0);
  const [chk, setChk] = useState("");


  let payload = {
    cart_id: cart_id
  }

  let today = new Date();


  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Checkout'],
    retry: false,
    queryFn: () => PosttoCheckout(
      payload
    ),
    onSuccess: (data) => {
      setChk(data)
    },

    //enabled: false
  })

  useRefetch(refetch)


  // let mainData = {
  //   orderId: orderData?.data?.data?.orderId,
  //   payment_id: razorRes?.razorpay_payment_id,
  //   razorpayOrderId: razorRes?.razorpay_order_id,
  //   signature: razorRes?.razorpay_signature
  // }


  const { mutate, refetch: postsubrefetch, data: orderNewData, isLoading: placeLoading } = useMutation({
    mutationKey: 'placedOrder',
    mutationFn: PlaceOrder,
    onSuccess: async (data) => {
      setOrderData(data?.data?.data)
      if (data?.data?.data?.data?.paymentType === 'cod') {
        setCount(count => count + 1)
      }
      await storage.setStringAsync('order_id', data?.data?.data?.orderId);

      if (radioBtnStatus === 0) {
        navigation.navigate('OrderPlaced', { item: data?.data?.data })
        setCartItems([])
        await storage.setMapAsync('cart_id', null);
        setUseSlot()
      } else {
        // setOrderData(orderNewData)
        // setTimeout(() => {
        //   handlePayment(data)
        // }, 2000);
        navigation.navigate('Processing', { data, chk })
      }
    }

  })

  reactotron.log(data?.data?.data?.delivery_slot, "chk")



  // const { mutate: reMutation, refetch: newRefetch } = useMutation({
  //   mutationKey: 'UpdateOrderdata',
  //   mutationFn: UpdateOrder,
  //   onSuccess: (data) => {
  //     setCount(count => count + 1);

  //     navigation.navigate('OrderPlaced', { item: data?.data?.data })
  //   }
  // })

  // const updateMutation = (data) => {
  //   reMutation({
  //     orderId: data?.orderId,
  //     payment_id: data?.razorpay_payment_id,
  //     razorpayOrderId: data?.razorpay_order_id,
  //     signature: data?.razorpay_signature
  //   })
  // }




  const checkBox = (num) => (
    <TouchableOpacity onPress={() => stRadioBtnStatus(num)}>
      <Ionicons name={radioBtnStatus === num ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
    </TouchableOpacity>
  )

  // const handlePayment = (data) => {
  //   var options = {
  //     description: '',
  //     image: 'https://mmdcartadmin.diginestsolutions.in/static/media/logo.5a3a4acf9425f0097cef.png',
  //     currency: 'INR',
  //     key: RAZORPAY_KEY,
  //     amount: chk?.data?.data?.total * 100,
  //     name: 'DG Cart',
  //     order_id: data?.data?.data?.razorPayId,//Replace this with an order_id created using Orders API.
  //     prefill: {
  //       email: user?.user?.email,
  //       contact: user?.user?.mobile,
  //       name: user?.user?.name
  //     },
  //     theme: { color: '#53a20e' }
  //   }
  //   RazorpayCheckout.open(options).then((data) => {
  //     data.orderId = order_id;


  //     //setRazorRes(data)
  //     updateMutation(data)
  //     //navigation.navigate('Processing')
  //     //alert(`Success: ${data.razorpay_payment_id}`);
  //   }).catch((error) => {
  //     //alert(`Error: ${error.code} | ${error.description}`);
  //   });
  // }


  const placeOrder = () => {
    if (data?.data?.data?.delivery_slot === 1 && !useSlot) {
      storage.setString('error', "Delivery Date & Time is required!");
    }
    else {
      mutate({
        itemDetails: cartItems,
        billingAddress: item,
        shippingAddress: item,
        orderDate: moment(today).format("YYYY-MM-DD"),
        subTotal: data?.data?.data?.subtotal,
        discount: data?.data?.data.discount,
        tax: data?.data?.data?.tax,
        delivery_charge: data?.data?.data?.deliveryCharge,
        total: data?.data?.data?.total,
        paymentType: radioBtnStatus === 0 ? "cod" : "online",
        paymentStatus: radioBtnStatus === 0 ? "pending" : "completed",
        customer_id: user?.user?._id,
        cartId: cart_id,
        slot_id: useSlot?.idData?._id,
        slot_date: useSlot?.date
      })

    }
  }


  return (
    <View style={styles.container}>
      <Header icon={true} />
      <CommonHeader heading={"Checkout"} backBtn />
      <ScrollView contentContainerStyle={styles.innerContainer}>

        <View >
          <View style={{ paddingHorizontal: 15 }}>
            {cartItems?.map(item => (
              <CheckoutCard item={item} />
            ))}
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
              <Text style={styles.description}>{item?.area?.address}</Text>
            </View>
          </View>

          {
            data?.data?.data?.delivery_slot === 1 ? (
              <View style={styles.payBox}>
                <SubHeading label={"Delivery Slots"} />
                <View style={{ gap: 8, marginVertical: 10 }}>
                  <View style={styles.checkbox}>
                    <ChooseDate />
                  </View>
                </View>
              </View>
            ) : null
          }

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
                <Text style={styles.priceBox}>₹ {parseFloat(data?.data?.data?.subtotal)?.toFixed(2)}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>GST</Text>
                <Text style={styles.priceBox}>₹ {parseFloat(data?.data?.data?.tax)?.toFixed(2)}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.subBox}>Delivery Charge</Text>
                <Text style={styles.priceBox}>₹ {parseFloat(data?.data?.data.deliveryCharge)?.toFixed(2)}</Text>
              </View>
              <View style={styles.containerTwo}>
                <Text style={styles.textStyle}>Grand Total</Text>
                <Text style={styles.priceBox}>₹ {parseFloat(data?.data?.data?.total)?.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 22, marginTop: 20 }}>
          <CommonButton text={"Place Order"} onPress={placeOrder} loading={placeLoading} />
        </View>

      </ScrollView>
    </View>
  )
}

export default Checkout

const makeStyle = (color) => StyleSheet.create({
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
    fontSize: 15,
    color: COLORS.light
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.light
  },
  locationStyle: {
    flexDirection: "row",
    width: 325,
    gap: 5,
    marginTop: 8
  },
  payBox: {
    paddingHorizontal: 22,
    marginTop: 10
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
    color: color.primary,
  },
  shipping: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})