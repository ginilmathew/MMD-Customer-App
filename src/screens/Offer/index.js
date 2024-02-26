import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts, offerProducts } from '../../api/allProducts'
import { useInfiniteQuery, useQuery } from 'react-query'
import { COLORS } from '../../constants/COLORS'
import NoData from '../../components/NoData'
import ProductCard from '../../components/ProductCard'
import CartContext from '../../context/cart'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import CartButton from '../../components/CartButton'
import useRefreshOnFocus from '../../hooks/useRefetch'
import LocationContext from '../../context/location'

const AllProducts = ({ navigation }) => {

    const { cartItems } = useContext(CartContext);
    const { location } = useContext(LocationContext)


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
        queryKey: ['offerproducts'],
        queryFn: () => offerProducts({
            coordinates: [location?.location?.latitude, location?.location?.longitude]
        }),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined;
            return pages?.length + 1
        },
    })


    useRefreshOnFocus(refetch)



    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <ProductCard key={index} item={item} cartItems={cartItems}  />
            </View>
        )
    }, [])

    const ListFooterComponents = memo(() => {
        return (
            <View style={{ marginBottom: 150 }}>
            </View>
        )
    },)

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <CommonHeader heading={"Offer Products"}  />
            <FlatList
                data={data?.data?.data?.data}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={refetch}
                ListEmptyComponent={emptyScreen}
            />

            <CartButton bottom={20} />
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