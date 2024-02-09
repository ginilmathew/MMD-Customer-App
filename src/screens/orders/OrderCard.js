import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { COLORS } from '../../constants/COLORS'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

const OrderCard = ({ item }) => {

    const navigation = useNavigation();

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

    const orderPage = useCallback(() => {
        navigation.navigate('SingleOrder', {item : item })
    }, [navigation])

    return (
        <TouchableOpacity style={styles.container} onPress={orderPage}>
            <View style={styles.orderStyle}>
                <View style={styles.orderTwoStyle}>
                    <Text style={styles.subText}>Order ID : </Text>
                    <Text style={styles.mainText}>{item?.order_id}</Text>
                </View>
                <Text style={styles.timeStyle}>{moment(item?.created_at).format("DD-MM-YYYY hh:mm a")}</Text>
            </View>
            <View style={styles.borderStyle} />
            <View style={styles.secondContainer}>
                <View>
                    <View style={styles.orderTwoStyle}>
                        <Text style={styles.subText}>No. of Items : </Text>
                        <Text style={styles.mainText}>{item?.itemDetails?.length}</Text>
                    </View>
                    <View style={styles.orderTwoStyle}>
                        <Text style={styles.subText}>Total Amount : </Text>
                        <Text style={styles.mainText}>₹ {item?.total}</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusSub}>Status</Text>
                    {statusColor()}
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default memo(OrderCard);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        marginBottom: 12
    },
    subText: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: COLORS.light
    },
    mainText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        color: COLORS.light
    },
    orderStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingHorizontal: 12,
    },
    orderTwoStyle: {
        flexDirection: "row"
    },
    timeStyle: {
        fontFamily: "Poppins-Italic",
        fontSize: 10,
        color: COLORS.light,
        opacity: 0.5,
        marginTop: 2
    },
    borderStyle: {
        paddingVertical: 4,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.border_color,
        opacity: 0.1,
        width: "100%"
    },
    secondContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "space-between"
    },
    statusSub: {
        fontFamily: "Poppins-Medium",
        fontSize: 10,
        color: COLORS.light,
        opacity: 0.5
    },
    statusText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
    },
    statusContainer: {
        gap: -5,
        justifyContent: 'flex-end',
    }
})