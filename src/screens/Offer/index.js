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

const AllProducts = ({ navigation }) => {

    const { cartItems } = useContext(CartContext);

    const {
        data,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['offerproducts'],
        queryFn: offerProducts,
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
                data={data?.data?.data}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={refetch}
                ListEmptyComponent={emptyScreen}
            />

            <CartButton bottom={50} />
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