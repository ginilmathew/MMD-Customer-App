import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import OrderCard from './OrderCard'

const Orders = () => {
    return (
        <View style={styles.mainStyle}>
            <Header />
            <CommonHeader heading={"My Orders"} />
            <View style={styles.innerContainer}>
                <OrderCard />
            </View>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: "#fff",
        flex: 1
    },
    innerContainer: {
        padding: 12
    }
})