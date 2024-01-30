import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import { COLORS } from '../../constants/COLORS'
import NotificationCard from './NotificationCard'

const NotificationPage = () => {

    // const renderItem = ({ item }) => {
    //     return (
    //         <NotificationCard
    //             data={item}
    //         />
    //     )
    // }

    return (
        <View style={styles.container}>
            <Header />
            <CommonHeader heading={"Notifications"} backBtn />
            <View style={styles.innerContainer}>
                <NotificationCard />
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