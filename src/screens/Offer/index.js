import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts, offerProducts } from '../../api/allProducts'
import { useInfiniteQuery } from 'react-query'
import { COLORS } from '../../constants/COLORS'
import NoData from '../../components/NoData'
import ProductCard from '../../components/ProductCard'
import CartContext from '../../context/cart'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import CartButton from '../../components/CartButton'

const AllProducts = ({ navigation }) => {

    const { cartItems } = useContext(CartContext);
    const [time, setTime] = useState(moment().unix())

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
            "coordinates": [
                8.5204866, 76.9371447
            ],
            // coordinates: [location?.location?.latitude, location?.location?.longitude],
        }),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return undefined;
            return pages?.length + 1
        },
    })




    useFocusEffect(
        useCallback(() => {
            setTime(moment().unix())
        }, [])
    )



    const last_Page = data?.pages[0]?.data?.data?.last_page;

    const pageCount = data?.pages?.length;



    const onEndReach = useCallback(() => {
        if (!isFetching && !isFetchingNextPage && hasNextPage && (last_Page * 1 !== pageCount * 1)) {
            fetchNextPage()
        }
    }, [!isFetching, !isFetchingNextPage, hasNextPage])

    // const scrollToTop = () => {
    //     if (flatListRef.current) {
    //         flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    //     }
    // };


    const AnimatedStyle = useCallback((index) => {
        return FadeInDown.delay(index * 100).duration(100).springify().damping(12);
    }, [])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Animated.View entering={AnimatedStyle(index)} style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <ProductCard key={index} item={item} cartItems={cartItems} time={time} />
            </Animated.View>
        )
    }, [time])

    const ListFooterComponents = memo(() => {
        return (
            <View style={{ marginBottom: 150 }}>
                {isFetchingNextPage && <ActivityIndicator size="large" color={COLORS.primary} />}
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
            <CommonHeader heading={"Offer Products"} />
            <FlatList
                data={data?.pages?.map(page => page?.data?.data?.data)?.flat()}
                ListFooterComponent={ListFooterComponents}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReach}
                refreshing={isLoading}
                onRefresh={refetch}
                onEndReachedThreshold={.1}
                ListEmptyComponent={emptyScreen}
            />

            <CartButton bottom={120} />
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