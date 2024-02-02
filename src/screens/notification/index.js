import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import { COLORS } from '../../constants/COLORS'
import NotificationCard from './NotificationCard'
import { getNotifications } from '../../api/NotificationList'
import reactotron from 'reactotron-react-native'
import { useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'

const NotificationPage = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['notify-query'],
        queryFn: () => getNotifications(),
        enabled: true
    })

    useRefetch(refetch)

    reactotron.log(data, "HOW")

    const renderItem = ({ item, index }) => {
        return (
            <NotificationCard data={item} key={index}/>
        )
    }

    return (
        <View style={styles.container}>
            <Header />
            <CommonHeader heading={"Notifications"} backBtn />
            <View style={styles.innerContainer}>
                <FlatList
                    data={data?.data?.data}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    //ListEmptyComponent={EmptyComp}
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