import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import OrderCard from './OrderCard'

const Orders = ({ navigation }) => {

    const orderPage = useCallback(() => {
        navigation.navigate('SingleOrder')
    }, [navigation])

    // const renderItem = ({ item }) => {
    //     return (
    //         <OrderCard
    //             data={item}
    //         />
    //     )
    // }

    return (
        <View style={styles.mainStyle}>
            <CommonHeader heading={"My Orders"} />
            <View style={styles.innerContainer}>
                <OrderCard onPress={orderPage} />
            </View>
            {/* <FlatList
                    data={list}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ListEmptyComponent={EmptyComp}
                    showsVerticalScrollIndicator={false}
                /> */}
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