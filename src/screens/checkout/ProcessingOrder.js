import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { COLORS } from '../../constants/COLORS'
import LottieView from 'lottie-react-native'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import RazorpayCheckout from 'react-native-razorpay';
import { useMutation } from 'react-query'
import reactotron from 'reactotron-react-native'
import { UpdateOrder } from '../../api/updateOrder'
import { RAZORPAY_KEY } from '../../constants/API'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import CartContext from '../../context/cart'


const ProcessingOrder = ({route, navigation}) => {

    const { data, chk } = route?.params;
  const [user] = useMMKVStorage('user', storage);
  const [order_id] = useMMKVStorage('order_id', storage);
  const { setCartItems } = useContext(CartContext);


    reactotron.log({data})

    useEffect(() => {
        if(data){
            handlePayment(data)
        }
    }, [data])
    

    const handlePayment = (data) => {
        var options = {
          description: '',
          image: 'https://mmdcartadmin.diginestsolutions.in/static/media/logo.5a3a4acf9425f0097cef.png',
          currency: 'INR',
          key: RAZORPAY_KEY,
          amount: chk?.data?.data?.total * 100,
          name: 'DG Cart',
          order_id: data?.data?.data?.razorPayId,//Replace this with an order_id created using Orders API.
          prefill: {
            email: user?.user?.email,
            contact: user?.user?.mobile,
            name: user?.user?.name
          },
          theme: { color: '#53a20e' }
        }
        RazorpayCheckout.open(options).then((data) => {
          data.orderId = order_id;
    
       
          //setRazorRes(data)
          updateMutation(data)
          //navigation.navigate('Processing')
          //alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            storage.setString("error",'Payment cancelled by user');
            navigation.goBack()
          //alert(`Error: ${error.code} | ${error.description}`);
        });
      }

      const { mutate: reMutation, refetch: newRefetch } = useMutation({
        mutationKey: 'UpdateOrderdata',
        mutationFn: UpdateOrder,
        onSuccess: async(data) => {
          //reactotron.log(data, "OR")
          setCartItems([])
          await storage.setMapAsync('cart_id', null);
          navigation.navigate('OrderPlaced', { item: data?.data?.data})
        }
      })
    
      const updateMutation = (data) => {
        reMutation({
          orderId: data?.orderId,
          payment_id: data?.razorpay_payment_id,
          razorpayOrderId: data?.razorpay_order_id,
          signature: data?.razorpay_signature
        })
      }
    
    return (
        <View style={styles.container}>
                <LottieView source={require('../../lottie/processing.json')} autoPlay loop style={styles.lottieStyle} />
                <Text style={styles.textStyle}>Processing Payment...</Text>
        </View>
    )
}

export default ProcessingOrder

const styles = StyleSheet.create({
    lottieStyle: {
        width: 400,
        height: 400,
        marginTop: -200
    },
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        fontFamily: "Poppins-Italic",
        color: COLORS.light,
        opacity: 0.5,
        fontSize: 15,
        marginTop: -120,
        letterSpacing: 2
    }
})