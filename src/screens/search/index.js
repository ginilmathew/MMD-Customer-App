import { ActivityIndicator, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import CustomSearch from '../../components/CustomSearch'
import { COLORS } from '../../constants/COLORS'
import { useMutation } from 'react-query'
import { getSearchList } from '../../api/Search'
import Animated, { FadeInDown } from 'react-native-reanimated'
import NoData from '../../components/NoData'
import CartContext from '../../context/cart'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import ProductCard from '../../components/ProductCard'

const Search = () => {


    const [value, setValue] = useState('')
    const { cartItems } = useContext(CartContext);
    const [time, setTime] = useState(moment().unix())

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

    useFocusEffect(
        useCallback(() => {
            setTime(moment().unix())
        }, [])
    )


    const AnimatedStyle = useCallback((index)=>{
        return FadeInDown.delay(index * 300).duration(200).springify().damping(12);
      },[])


    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <Animated.View entering={AnimatedStyle(index)} style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    {/* <ItemCard key={index} item={item} /> */}
                    <ProductCard key={item._id} item={item} cartItems={cartItems} time={time} />
                </Animated.View>
            </>
        )
    }, [time])


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
               <Header icon={true}/>
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
               <Header icon={true}/>
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
             <Header icon={true}/>
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