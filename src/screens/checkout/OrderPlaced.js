import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { COLORS } from '../../constants/COLORS';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { useNavigation } from '@react-navigation/native';
import reactotron from 'reactotron-react-native';

const OrderPlaced = ({ route }) => {

    const item = route?.params

    reactotron.log(item, "DA2")

    const navigation = useNavigation();

    useEffect(() => {
        if (item?.item === 0) {
            setTimeout(() => {
                navigation.navigate('Orders')
            }, 2000);
        }
    }, [item , navigation])


    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.innerContainer}>
                <LottieView source={require('../../lottie/orderPlaced.json')} autoPlay loop style={styles.lottieStyle} />
                <View style={styles.idStyle}>
                    <Text style={styles.orderID}>Order ID : </Text>
                    <Text style={styles.orderID2}>65321</Text>
                </View>
                <Text style={styles.subText}>22/05/2024 10:30am</Text>
            </View>
        </View>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({
    lottieStyle: {
        width: 400,
        height: 400
    },
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    innerContainer: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center"
    },
    orderID: {
        fontFamily: "Poppins-Regular",
        fontSize: 25,
        color: COLORS.light
    },
    orderID2: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 25,
        color: COLORS.light
    },
    idStyle: {
        flexDirection: "row",
        marginTop: -20
    },
    subText: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5
    }
})