import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'

import Animated, { FadeInDown } from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'
import CustomTab from '../../components/CustomTab'
import { COLORS } from '../../constants/COLORS'

const SingleCategory = () => {

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



    const LIST = [{ id: 1, name: 'All' }, { id: 2, name: 'fruits' }, { id: 3, name: 'nuts' }, { id: 4, name: 'seed' }, { id: 5, name: 'vitamins' }]


    const ListHeaderComponents = useCallback(({ item, index }) => {
        
        return (
            <View style={{ padding: 8, backgroundColor: COLORS.white }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    {LIST.map((res, index) => (

                        <Animated.View entering={FadeInDown.delay(index * 50).duration(200).springify().damping(12)} key={index} style={{ marginRight: 10 }}>
                            <CustomTab label={res?.name} />
                        </Animated.View>
                    ))}
                </ScrollView>
            </View>
        )

    }, [])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <Animated.View entering={FadeInDown.delay(index * 200).duration(200).springify().damping(12)} >
                    <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                        <ItemCard item={item} />
                    </View>

                </Animated.View>
            </>
        )
    }, [])

    const ListFooterComponent = useCallback(() => {
        return (
            <>
                <View style={{ marginBottom: 130 }}></View>
            </>
        )
    }, [])


    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Header />
            <CommonHeader heading={'Spinach'} backBtn />
            <FlatList
                stickyHeaderIndices={[0]}
                data={DATA2}
                ListHeaderComponent={ListHeaderComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}

            />

        </View>
    )
}

export default SingleCategory

const styles = StyleSheet.create({
    tabConatiner: {
        paddingHorizontal: 20,
    },
    tabView: {
        gap: 5,
        flexDirection: 'row'
    }
})