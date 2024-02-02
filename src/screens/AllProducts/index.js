import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import ItemCard from '../../components/ItemCard'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts } from '../../api/allProducts'
import { useInfiniteQuery, useQuery } from 'react-query'
import useRefreshOnFocus from '../../hooks/useRefetch'
import reactotron from 'reactotron-react-native'
import { COLORS } from '../../constants/COLORS'

const AllProducts = ({ navigation }) => {

    const {
        data,
        error,
        fetchNextPage,
        refetch,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isLoading,
        remove: infiniteQueryRemove
    } = useInfiniteQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProducts,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined;
            return pages?.length + 1
        },
    })



    const flatListRef = useRef(null);

    const onEndReach = () => {
        if (hasNextPage && !isLoading) {
            fetchNextPage()
        }
    }

    // const scrollToTop = () => {
    //     if (flatListRef.current) {
    //         flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    //     }
    // };


    const AnimatedStyle = useCallback((index) => {
        return FadeInDown.delay(index * 200).duration(200).springify().damping(12);
    }, [])

    const renderItem = useCallback(({ item, index }) => {



        return (
            <Animated.View entering={AnimatedStyle(index)}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard item={item} key={item?._id} />
                </View>
            </Animated.View>
        )
    }, [])

    const ListFooterComponents = memo(() => {
        return (
            <View style={{ marginBottom: 100 }}>
                {isFetchingNextPage && <ActivityIndicator size="large" color={COLORS.primary} />}
            </View>
        )
    },)



    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Header />
            <CommonHeader heading={"Products"} backBtn={true} />
            <FlatList
                data={data?.pages?.map(page => page?.data?.data?.data)?.flat()}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={15}
                onEndReached={onEndReach}
                refreshing={isLoading}
                onRefresh={refetch}
                onEndReachedThreshold={.5}
            />
       

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({
    scrollToTopButton: {
      
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 5,
    },
    scrollToTopButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
})