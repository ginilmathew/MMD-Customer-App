import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import ItemCard from '../../components/ItemCard'
import Animated, { FadeInDown } from 'react-native-reanimated'

const AllProducts = ({ navigation }) => {
    const DATA2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 200).duration(200).springify().damping(12)}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard />
                </View>
            </Animated.View>
        )
    }, [])

    const ListFooterComponents = useCallback(() => {
        return (
            <View style={{ marginBottom: 30 }}>
            </View>
        )
    }, [])



    return (
        <>
            <Header />
            <CommonHeader heading={"Products"} backBtn={true} />
            <Animated.FlatList
                data={DATA2}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}

            />

        </>
    )
}

export default AllProducts

const styles = StyleSheet.create({})