import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'

const Orders = () => {
    return (
        <View>
            <Header />
            <CommonHeader heading={"My Orders"} />
            <Text>index</Text>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({})