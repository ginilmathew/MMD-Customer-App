import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import ItemCard from '../../components/ItemCard'
import Animated, { FadeInDown } from 'react-native-reanimated'

const AllProducts = ({ navigation }) => {
    const DATA2 =
    [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },

    ]

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 200).duration(200).springify().damping(12)}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard item={item}/>
                </View>
            </Animated.View>
        )
    }, [])

    const ListFooterComponents = memo(() => {
        return (
            <View style={{ marginBottom: 130 }}>
            </View>
        )
    },)



    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Header />
            <CommonHeader heading={"Products"} backBtn={true} />
            <Animated.FlatList
                data={DATA2}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({})