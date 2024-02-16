import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import { COLORS } from '../../constants/COLORS'
import NotificationCard from './NotificationCard'
import { getNotifications } from '../../api/NotificationList'
import { useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import NoData from '../../components/NoData'

const NotificationPage = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['notify-query'],
        queryFn: () => getNotifications(),
        enabled: true
    })

    useRefetch(refetch)



    const renderItem = ({ item, index }) => {
        return (
            <NotificationCard data={item} key={index}/>
        )
    }

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    const isoToTimestamp = (isoTimestamp) => {
        return new Date(isoTimestamp).getTime();
    };

    const sortedNotList = data?.data?.data?.slice().sort((a, b) => isoToTimestamp(b.updated_at) - isoToTimestamp(a.updated_at));

    return (
        <View style={styles.container}>
           <Header icon={true}/>
            <CommonHeader heading={"Notifications"} backBtn />
            <View style={styles.innerContainer}>
                <FlatList
                    data={sortedNotList}
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