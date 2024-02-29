import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts, offerProducts } from '../../api/allProducts'
import { useInfiniteQuery } from 'react-query'
import  COLORS  from '../../constants/COLORS'
import NoData from '../../components/NoData'
import ProductCard from '../../components/ProductCard'
import CartContext from '../../context/cart'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import CartButton from '../../components/CartButton'
import LocationContext from '../../context/location'
import reactotron from 'reactotron-react-native'
import useRefreshOnFocus from '../../hooks/useRefetch'

const AllProducts = ({ navigation }) => {

    const styles = makeStyle(COLORS)
    const { location } = useContext(LocationContext)


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
        remove: infiniteQueryRemove,
        
    } = useInfiniteQuery({
        queryKey: ['offerproducts'],
        enabled:true,
        queryFn: ({pageParam = 1 }) => offerProducts(pageParam,{
            coordinates: [location?.location?.latitude, location?.location?.longitude],
        }),
        getNextPageParam: (lastPage, pages) => {
            if(pages?.length > 0){
                return pages?.length + 1
            }
            else{
                return 1
            }
            //reactotron.log({lastPage, pages})
            //if (lastPage.length === 0) return undefined;
            //return pages?.length + 1
        },
        
    })


    //reactotron.log({hasNextPage})




    useFocusEffect(
        useCallback(() => {
            setTime(moment().unix())
        }, [])
    )


    useRefreshOnFocus(refetch)

    // const last_Page = data?.pages[0]?.data?.data?.last_page;

    // const pageCount = data?.pages?.length;



    const onEndReach = () => {
        reactotron.log({data})
        if(data?.pages?.length < data?.pages?.[0]?.data?.data?.last_page){
            fetchNextPage()
        }
    }

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
        <Animated.View style={{ backgroundColor: '#fff' }}>
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
                ListEmptyComponent={emptyScreen}
            />

            <CartButton bottom={45} />
        </Animated.View>
    )
}

export default AllProducts

const makeStyle = (color) => StyleSheet.create({
    // scrollToTopButton: {

    //     bottom: 20,
    //     right: 20,
    //     backgroundColor: color.primary,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 8,
    //     elevation: 5,
    // },
    // scrollToTopButtonText: {
    //     color: COLORS.white,
    //     fontWeight: 'bold',
    // },
})