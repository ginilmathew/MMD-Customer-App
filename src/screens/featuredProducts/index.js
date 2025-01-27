import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { getfeaturedProduct } from '../../api/featuredProducts';
import { useQuery } from 'react-query';
import Animated, { FadeInDown } from 'react-native-reanimated';
import NoData from '../../components/NoData';
import ProductCard from '../../components/ProductCard';
import CartContext from '../../context/cart';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import CartButton from '../../components/CartButton';


const FeaturedProduct = ({ route }) => {
    const { id, name } = route.params;
    const { cartItems } = useContext(CartContext);
    const [time, setTime] = useState(moment().unix())



    const { data, isLoading, refetch } = useQuery({
        queryKey: ['featuredProduct'],
        queryFn: () => getfeaturedProduct(id),
        enabled: true
    })

    useFocusEffect(
        useCallback(() => {
            setTime(moment().unix())
        }, [])
    )





    const ListHeaderComponents = useCallback(() => {
        return (
            <>
                <Header icon={true}/>
                <CommonHeader heading={name} backBtn />
            </>
        )
    }, [])


    const AnimatedStyle = useCallback((index) => {
        return FadeInDown.delay(index * 200).duration(200).springify().damping(12);
    }, [])


    const renderItem = useCallback(({ item, index }) => {
        return (
            <Animated.View entering={AnimatedStyle(index)} style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                {/* <ItemCard key={index} item={item} /> */}
                <ProductCard key={index} item={item} cartItems={cartItems} time={time} />
            </Animated.View>
        )

    }, [time])

    const ListFooterComponent = () => {
        return (
            <View style={styles.footer}></View>
        )
    }

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    return (
        <>
            <FlatList
                data={data?.data?.data?.[0]?.featuredList}
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
                ListEmptyComponent={emptyScreen}
            />

            <CartButton bottom={25} />
        </>
    )
}

export default FeaturedProduct

const styles = StyleSheet.create({
    footer: {
        marginBottom: 90
    },
    flatlistContainer: {
        backgroundColor: '#fff',
        flexGrow: 1,
    }
})