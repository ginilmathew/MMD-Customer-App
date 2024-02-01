import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import ItemCard from '../../components/ItemCard'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getAllProducts } from '../../api/allProducts'
import { useInfiniteQuery, useQuery } from 'react-query'
import useRefreshOnFocus from '../../hooks/useRefetch'

const AllProducts = ({ navigation }) => {
    const DATA2 =
    [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },

    ]

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

  
    // const [page, setPage] = React.useState(1)
    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data,
    //     refetch,
    //     isFetching,
    //     isPreviousData,
        
    //   } = useQuery({
    //     queryKey: ['allProducts', page],
    //     queryFn: () => getAllProducts(page),
    //     keepPreviousData : true
    //   })


      useRefreshOnFocus(refetch)
    console.log({data:data?.pages?.map(page => page?.data)?.flat()})


    const renderItem = useCallback(({ item, index }) => {
        const animatedStyle = FadeInDown.delay(index * 200).duration(200).springify().damping(12);
     console.log({item:item?.data?.data})
        return (
            <Animated.View entering={animatedStyle}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    {/* <ItemCard item={item?.data?.data}/> */}
                    <Text>hello</Text>
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
                data={data?.pages?.map(page => page?.data)?.flat()}
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