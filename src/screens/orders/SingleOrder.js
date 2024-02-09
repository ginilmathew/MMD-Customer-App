import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import { COLORS } from '../../constants/COLORS'
import SubHeading from '../../components/SubHeading'
import moment from 'moment'

const SingleOrder = ({ route }) => {

    const { item } = route.params;

    // const statusColor = () => {
    //     let color;
    //     switch (item?.orderStatus) {
    //         case "created":
    //             color = COLORS.status_created;
    //             break;
    //         case "Accept":
    //             color = COLORS.status_accepted;
    //             break;
    //         case "Out for delivery":
    //             color = COLORS.status_out;
    //             break;
    //         case "Delivered":
    //             color = COLORS.status_completed;
    //             break;
    //         case "Cancelled":
    //             color = COLORS.status_cancelled;
    //             break;
    //         case "paid":
    //             color = COLORS.status_paid;
    //             break;
    //         default:
    //             color = COLORS.default_color; // Assuming you have a default color defined
    //             break;
    //     }
    //     return (
    //         <Text style={[styles.statusText, { color: color }]}>{item?.orderStatus}</Text>
    //     );
    // }

    const statusColor = () => {
        const statusMapping = {
            "created": COLORS.status_created,
            "Accept": COLORS.status_accepted,
            "Out for delivery": COLORS.status_out,
            "Delivered": COLORS.status_completed,
            "Cancelled": COLORS.status_cancelled,
            "paid": COLORS.status_paid,
        };
    
        const color = statusMapping[item?.orderStatus] || COLORS.light;
    
        return (
            <Text style={[styles.statusText, { color }]}>{item?.orderStatus}</Text>
        );
    }

    return (
        <View style={styles.mainStyle}>
            <Header />
            <CommonHeader heading={`Order ID : ${item?.order_id}`} backBtn />
            <ScrollView contentContainerStyle={styles.innerContainer}>

                <View style={styles.secondContainer}>
                    <View style={styles.statusContainer}>
                        <Text style={styles.subText}>Ordered Date</Text>
                        <Text style={styles.mainText}>{moment(item?.created_at).format("DD-MM-YYYY hh:mm a")}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusSub}>Status</Text>
                        <Text style={styles.statusText}>{statusColor()}</Text>
                    </View>
                </View>

                <View style={styles.singleContainer}>
                    <SubHeading label={"Products & Bill"} />
                    {item?.itemDetails?.map(item => (
                        <View style={styles.imgContainer} key={item?._id}>
                            <View style={styles.boxStyle}>
                                <Image source={{ uri: item?.image }} style={styles.imgStyle} />
                                <View style={styles.imgSection}>
                                    <View>
                                        <Text style={styles.productName}>{item?.name}</Text>
                                        <Text style={styles.categoryName}>Category : {item?.category?.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.unitStyle}>{item?.unit?.name} : {item?.variant?.name}</Text>
                                        
                                    </View>
                                </View>
                            </View>
                            <View style={styles.qtyBox}>
                                <Text style={styles.price}>₹ {item?.variant?.offerPrice ? item?.variant?.offerPrice * item?.qty : item?.variant?.sellingPrice * item?.qty}</Text>
                                {/* <Text style={styles.qty}>Qty x {item?.qty}</Text> */}
                                <Text style={styles.qty}>Qty x {item?.qty}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.totalContainer}>
                        <View style={styles.textBox}>
                            <Text style={styles.subBox}>Sub-Total</Text>
                            <Text style={styles.priceBox}>₹ {item?.subTotal}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.subBox}>GST</Text>
                            <Text style={styles.priceBox}>₹ {item?.tax}</Text>
                        </View>
                        {item?.discount ? <View style={styles.textBox}>
                            <Text style={styles.subBox}>Discount</Text>
                            <Text style={styles.priceBox}>- ₹ {item?.discount}</Text>
                        </View> : null}
                        <View style={styles.textBox}>
                            <Text style={styles.subBox}>Delivery Charge</Text>
                            <Text style={styles.priceBox}>₹ {item?.delivery_charge}</Text>
                        </View>
                        <View style={styles.containerTwo}>
                            <Text style={styles.textStyle}>Grand Total</Text>
                            <Text style={[styles.priceBox, { fontFamily: "Poppins-Bold" }]}>₹ {item?.total}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.singleContainer}>
                    <SubHeading label={"Payment Method"} />
                    <Text style={styles.paymentMethod}>{item?.paymentType}</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default SingleOrder

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: COLORS.white,
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
    imgContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imgStyle: {
        width: 80,
        height: 80,
        borderRadius: 12
    },
    imgSection: {
        width: "60%",
        justifyContent: "space-between"
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
        fontFamily: "Poppins-Italic",
        fontSize: 12,
        color: COLORS.light,
   
        marginLeft: 10
    },
    qtyBox: {
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    unitStyle: {
        fontFamily: "Poppins-MediumItalic",
        fontSize: 12,
        color: COLORS.light,
        marginLeft: 10
    }
})