import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import { COLORS } from '../../constants/COLORS'
import SubHeading from '../../components/SubHeading'

const SingleOrder = () => {
    return (
        <View style={styles.mainStyle}>
            <Header />
            <CommonHeader heading={"Order ID : 65321"} backBtn />
            <ScrollView contentContainerStyle={styles.innerContainer}>

                <View style={styles.secondContainer}>
                    <View style={styles.statusContainer}>
                        <Text style={styles.subText}>Ordered Date</Text>
                        <Text style={styles.mainText}>22/05/2024 10:30am</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusSub}>Status</Text>
                        <Text style={styles.statusText}>Processing</Text>
                    </View>
                </View>

                <View style={styles.singleContainer}>
                    <SubHeading label={"Products & Bill"} />
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

                <View style={styles.singleContainer}>
                    <SubHeading label={"Payment Method"} />
                    <Text style={styles.paymentMethod}>Cash On Delivery</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default SingleOrder

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: "#fff",
        flex: 1
    },
    innerContainer: {
        paddingHorizontal: 24,
        paddingTop: 15
    },
    secondContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
    },
    statusSub: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5
    },
    statusText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: COLORS.status_processing
    },
    statusContainer: {
        justifyContent: 'flex-end',
    },
    orderTwoStyle: {
        flexDirection: "row"
    },
    subText: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5
    },
    mainText: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: COLORS.light
    },
    paymentMethod: {
        color: "#569ED8",
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        paddingTop: 8
    },
    singleContainer: {
        marginVertical: 10
    },
    totalContainer: {
        marginTop: 10,
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
    }
})