import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLORS } from '../../constants/COLORS'

const OrderCard = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.orderStyle}>
                <View style={styles.orderTwoStyle}>
                    <Text style={styles.subText}>Order ID : </Text>
                    <Text style={styles.mainText}>65321</Text>
                </View>
                <Text style={styles.timeStyle}>22/05/2024 10:30am</Text>
            </View>
            <View style={styles.borderStyle} />
            <View style={styles.secondContainer}>
                <View>
                    <View style={styles.orderTwoStyle}>
                        <Text style={styles.subText}>No. of Items : </Text>
                        <Text style={styles.mainText}>1</Text>
                    </View>
                    <View style={styles.orderTwoStyle}>
                        <Text style={styles.subText}>Total Amount : </Text>
                        <Text style={styles.mainText}>₹ 140.50</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusSub}>Status</Text>
                    <Text style={styles.statusText}>Processing</Text>
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
        color: COLORS.status_processing
    },
    statusContainer: {
        gap: -5,
        justifyContent: 'flex-end',
    }
})