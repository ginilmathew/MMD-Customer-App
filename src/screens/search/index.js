import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import CustomSearch from '../../components/CustomSearch'
import { COLORS } from '../../constants/COLORS'
import { useMutation, useQuery } from 'react-query'
import { getSearchList } from '../../api/Search'
import useRefetch from '../../hooks/useRefetch'
import reactotron from 'reactotron-react-native'
import Animated from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'

const Search = () => {

    const DATA2 = [1, 2, 3, 4, 5, 6]
    const [value, setValue] = useState('')

    const { height } = useWindowDimensions()

    const { mutate, data, refetch } = useMutation({
        mutationKey: 'search',
        mutationFn: getSearchList,

    })






    reactotron.log({ data: data?.data?.data })
    let timeoutId;

    const onChangeProduct = useCallback((data) => {
        setValue(data)
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            mutate(data)
        }, 2000);
    }, [value]);




    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard key={index} item={item} />
                </View>
            </>
        )
    }, [data?.data?.data])


    const ListFooter = () => {
        return (
            <View style={{ marginBottom: 50 }}>

            </View>
        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header />
            <CommonHeader heading={'Search'} backBtn />
            <View>
                <CustomSearch values={value} onChangeText={onChangeProduct} />
            </View>
            <FlatList
                ListFooterComponent={ListFooter}
                StickyHeaderComponent={[0]}
                data={data?.data?.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1, marginHorizontal: 10 }}
            />
        </View>




    )
}

export default Search

const styles = StyleSheet.create({})