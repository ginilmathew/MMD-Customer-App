import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import COLORS from '../../constants/COLORS'
import NotificationCard from './NotificationCard'
import { getNotifications } from '../../api/NotificationList'
import { useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import NoData from '../../components/NoData'
import NotificationContext from '../../context/notification'

const NotificationPage = () => {

    const { setCount } = useContext(NotificationContext);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['notify-query'],
        queryFn: () => getNotifications(),
        enabled: true,
        onSuccess(data) {
            setCount(data?.data?.count);
        }
    })

    useRefetch(refetch)


    const renderItem = ({ item, index }) => {
        return (
            <NotificationCard data={item} key={index} refetch={refetch} />
        )
    }

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    

    return (
        <View style={styles.container}>
           <Header icon={true}/>
            <CommonHeader heading={"Notifications"} backBtn />
            <View style={styles.innerContainer}>
                <FlatList
                    data={data?.data?.data}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    ListEmptyComponent={emptyScreen}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default NotificationPage

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    innerContainer: {
        padding: 12
    }
})