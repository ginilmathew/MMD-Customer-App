import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import ItemCard from '../../components/ItemCard'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts } from '../../api/allProducts'
import { useInfiniteQuery, useQuery } from 'react-query'
import useRefreshOnFocus from '../../hooks/useRefetch'
import reactotron from 'reactotron-react-native'

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
            return pages?.length + 1
        },
        enabled: false

    })

  

      useRefreshOnFocus(refetch)
 


    const renderItem = useCallback(({ item, index }) => {
        reactotron.log({item})
        const animatedStyle = FadeInDown.delay(index * 200).duration(200).springify().damping(12);

        return (
            <Animated.View entering={animatedStyle}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard item={item}/>
                
                </View>
            </Animated.View>
         
           
            
        )
    }, [])

    const ListFooterComponents = memo(() => {
        return (
            <View style={{ marginBottom: 130 }}>
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
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true} 
                initialNumToRender={6} 
                maxToRenderPerBatch={6} />

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({})