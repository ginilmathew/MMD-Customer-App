import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import OrderCard from './OrderCard'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import reactotron from 'reactotron-react-native'
import { useQuery } from 'react-query'
import { getOrders } from '../../api/Orders'
import useRefetch from '../../hooks/useRefetch'

const Orders = () => {

    const [user] = useMMKVStorage('user', storage)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['order-query'],
        queryFn: () => getOrders(user?.user?._id),
        enabled: true
    })

    useRefetch(refetch)

    const renderItem = ({ item, index }) => {
        return (
            <OrderCard key={index} item={item} />
        )
    }

    return (
        <View style={styles.mainStyle}>
            <CommonHeader heading={"My Orders"} />
                <FlatList
                    data={data?.data?.data || []}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    //ListEmptyComponent={EmptyComp}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                />
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: "#fff",
        flex: 1
    },
    flatList: {
        padding: 12
    }
})