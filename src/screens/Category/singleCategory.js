import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'

import Animated, { FadeInDown } from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'
import CustomTab from '../../components/CustomTab'

const SingleCategory = () => {
    const DATA2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]


    const LIST = [{ id: 1, name: 'All' }, { id: 2, name: 'fruits' }, { id: 3, name: 'nuts' }, { id: 4, name: 'seed' }, { id: 5, name: 'vitamins' }]





    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <Animated.View entering={FadeInDown.delay(index * 200).duration(200).springify().damping(12)} >
                    <ItemCard />
                </Animated.View>
            </>
        )
    }, [])


    const ListHeaderComponents = useCallback(({ item, index }) => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              
                >
                <View style={styles.tabView}>
                    {LIST.map((res) => (
                        <CustomTab label={res?.name}/>
                    ))}
                </View>

            </ScrollView>
        )

    }, [])


    const ListFooterComponent = useCallback(() => {
        return (
            <>
                <View></View>
            </>
        )
    }, [])


    return (
        <>
            <Header />
            <CommonHeader heading={'Spinach'} backBtn />
            <FlatList
                data={DATA2}
                ListHeaderComponent={ListHeaderComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            // ListFooterComponent={ListFooterComponent}
            />

        </>
    )
}

export default SingleCategory

const styles = StyleSheet.create({
    tabConatiner:{
        paddingHorizontal:20,
    },
    tabView:{
        gap:5,
        flexDirection:'row'
    }
})