import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getCategory } from '../../api/category';
import useRefetch from '../../hooks/useRefetch'
import { useQuery } from 'react-query';
import NoData from '../../components/NoData';

const Category = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: getCategory,
        // enabled: true
    })


    useRefetch(refetch)

    const AnimatedStyle = useCallback((index) => {
        return FadeInDown.delay(index * 50).duration(150).springify().damping(12);
    }, [])


    const renderSectionHeader = useCallback(({ item, index }) => {

        return (
            <Animated.View entering={AnimatedStyle(index)} key={item?._id}>
                <View style={styles.itemContainer}>
                    <CategoryCard key={item?._id} item={item} />
                </View>
            </Animated.View>
        );
    }, [data?.data?.data, AnimatedStyle]);


    const ListHeaderComponent = memo(() => {
        return (
            <View>
             <Header icon={true}/>
                <CommonHeader heading={"Categories"} backBtn={true} />
            </View>
        )
    })

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    const KeyExtractor = useCallback((item) => {
        return item?._id
    }, [])

    return (
        <FlatList
            StickyHeaderComponent={[0]}
            ListHeaderComponent={ListHeaderComponent}
            data={data?.data?.data}
            numColumns={4}
            renderItem={renderSectionHeader}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={KeyExtractor}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={emptyScreen}
        />

    );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 4;
const styles = StyleSheet.create({
    flatListContent: {
        paddingHorizontal: 2,
        backgroundColor: '#fff',
        flex: 1
    },
    itemContainer: {
        width: itemWidth,
        marginBottom: 10,
    },
});

export default Category;
