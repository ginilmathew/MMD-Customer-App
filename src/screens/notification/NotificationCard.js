import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/COLORS'

const NotificationCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.text1}>Order Status Changed</Text>
                <Text style={styles.text2}>22/10/2024 10:30 pm</Text>
            </View>
            <View style={styles.heading2}>
                <Text style={styles.text3}>The status regarding your order 65452 has been updated to processing</Text>
                {/* <View style={styles.dotStyle}/> */}
            </View>
        </TouchableOpacity>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginTop: 5
    },
    heading: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "flex-end"
    },
    text1: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: COLORS.light
    },
    text2: {
        fontFamily: "Poppins-Italic",
        fontSize: 10,
        color: COLORS.light,
        opacity: 0.5
    },
    text3: {
        fontFamily: "Poppins-Light",
        fontSize: 14,
        color: COLORS.light,
        width: "90%"
    },
    heading2: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F2F2F2",
    },
    dotStyle: {
        padding: 5,
        backgroundColor: COLORS.red,
        width: 10,
        height: 10,
        borderRadius: 100
    }
})