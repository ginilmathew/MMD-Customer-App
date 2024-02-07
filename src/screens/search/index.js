import { ActivityIndicator, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import CustomSearch from '../../components/CustomSearch'
import { COLORS } from '../../constants/COLORS'
import { useMutation, useQuery } from 'react-query'
import { getSearchList } from '../../api/Search'
import useRefetch from '../../hooks/useRefetch'
import reactotron from 'reactotron-react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'
import NoData from '../../components/NoData'

const Search = () => {


    const [value, setValue] = useState('')

    const { height } = useWindowDimensions()

    const { mutate, data, refetch, isLoading } = useMutation({
        mutationKey: 'search',
        mutationFn: getSearchList,

    })

    let timeoutId;

    const onChangeProduct = useCallback((data) => {
        setValue(data);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            mutate(data)
        }, 2000);
    }, [value]);


    const AnimatedStyle = useCallback((index)=>{
        return FadeInDown.delay(index * 300).duration(200).springify().damping(12);
      },[])


    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <Animated.View entering={AnimatedStyle(index)} style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard key={index} item={item} />
                </Animated.View>
            </>
        )
    }, [data?.data?.data])


    const ListFooter = () => {
        return (
            <View style={{ marginBottom: 50 }}>

            </View>
        )
    }

    // Conditionally render loading indicator if data is still being fetched
    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <Header />
                <CommonHeader heading={'Search'} backBtn />
                <View>
                    <CustomSearch values={value} onChangeText={onChangeProduct} />
                </View>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    // Conditionally render a message if no data is found
    if (!data?.data?.data || data?.data?.data.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <Header />
                <CommonHeader heading={'Search'} backBtn />
                <View>
                    <CustomSearch values={value} onChangeText={onChangeProduct} />
                </View>
                <NoData/>
            </View>
        );
    }

    const commonKeyExtractor = (item, index) => {
        // Replace 'id' with the actual identifier in your data
        return item._id ;
      };
      

    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header />
            <CommonHeader heading={'Search'} backBtn />
            <View style={styles.searchcontainer}>
                <CustomSearch values={value} onChangeText={onChangeProduct} placeholder={"Search Products..."}/>
            </View>
            <FlatList

                ListFooterComponent={ListFooter}
                StickyHeaderComponent={[0]}
                data={data?.data?.data}
                initialNumToRender={10}
                renderItem={renderItem}
                keyExtractor={commonKeyExtractor}
                contentContainerStyle={{ flexGrow: 1, marginHorizontal: 10 }}
            />
        </View>




    )
}

export default Search

const styles = StyleSheet.create({
    searchcontainer:{
        marginBottom:10
    }
})