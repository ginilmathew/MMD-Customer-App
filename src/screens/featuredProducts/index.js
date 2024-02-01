import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { getfeaturedProduct } from '../../api/featuredProducts';
import { useQuery } from 'react-query';
import ItemCard from '../../components/ItemCard';


const FeaturedProduct = ({ route }) => {
    const { id, name } = route.params;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['featuredProduct'],
        queryFn: () => getfeaturedProduct(id),
        enabled: true
    })


    console.log({ DAT: data?.data?.data?.[0]?.featured_list })


    const ListHeaderComponents = useCallback(() => {
        return (
            <>
                <Header />
                <CommonHeader heading={name} backBtn />
            </>
        )
    }, [])


    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <ItemCard key={index} item={item} />
            </View>
        )

    }, [])

    const ListFooterComponent=()=>{
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
        windowSize={10}
        contentContainerStyle={styles.flatlistContainer}
        />
    )
}

export default FeaturedProduct

const styles = StyleSheet.create({
    footer:{
        marginBottom:60
    },
    flatlistContainer:{
        backgroundColor:'#fff'
    }
})