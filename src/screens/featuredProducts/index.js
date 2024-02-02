import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { getfeaturedProduct } from '../../api/featuredProducts';
import { useQuery } from 'react-query';
import ItemCard from '../../components/ItemCard';
import Animated, { FadeInDown } from 'react-native-reanimated';


const FeaturedProduct = ({ route }) => {
    const { id, name } = route.params;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['featuredProduct'],
        queryFn: () => getfeaturedProduct(id),
        enabled: true
    })


 


    const ListHeaderComponents = useCallback(() => {
        return (
            <>
                <Header />
                <CommonHeader heading={name} backBtn />
            </>
        )
    }, [])


    const AnimatedStyle = useCallback((index)=>{
        return FadeInDown.delay(index * 200).duration(200).springify().damping(12);
      },[])
    

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Animated.View entering={AnimatedStyle(index)} style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <ItemCard key={index} item={item} />
            </Animated.View>
        )

    }, [])

    const ListFooterComponent = () => {
        return (
            <View style={styles.footer}></View>
        )
    }

    return (
        <FlatList
            data={data?.data?.data?.[0]?.featured_list}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={ListHeaderComponents}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooterComponent}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            refreshing={isLoading}
            onRefresh={refetch}
            windowSize={10}
            contentContainerStyle={styles.flatlistContainer}
        />
    )
}

export default FeaturedProduct

const styles = StyleSheet.create({
    footer: {
        marginBottom: 50
    },
    flatlistContainer: {
        backgroundColor: '#fff',
       flexGrow:1,
    }
})