import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions, useWindowDimensions } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import Animated, { batch, FadeInDown } from 'react-native-reanimated';
import { getCategory } from '../../api/category';
import useRefreshOnFocus from '../../hooks/useRefetch';
import { useQuery } from 'react-query';

const Category = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: getCategory,
        enabled: true
    })


    useRefreshOnFocus(refetch)

    const AnimatedStyle = useCallback((index) => {
        return FadeInDown.delay(index * 100).duration(200).springify().damping(12);
    }, [])


    const renderSectionHeader = useCallback(({ item, index }) => {

        return (
            <Animated.View entering={AnimatedStyle(index)}>
                <View style={styles.itemContainer}>
                    <CategoryCard key={item?._id} item={item} />
                </View>
            </Animated.View>
        );
    }, [data?.data?.data]);


    const ListHeaderComponent = memo(() => {
        return (
            <View>
                <Header />
                <CommonHeader heading={"Categories"} backBtn={true} />
            </View>
        )
    })

    return (
        <FlatList
            StickyHeaderComponent={[0]}
            ListHeaderComponent={ListHeaderComponent}
            data={data?.data?.data}
            numColumns={4}
            renderItem={renderSectionHeader}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
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
