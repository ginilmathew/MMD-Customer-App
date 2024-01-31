import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View, Dimensions, useWindowDimensions } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import Animated, { batch, FadeInDown } from 'react-native-reanimated';

const Category = () => {
  

    const DATA2 = [1, 2, 3, 4, 5, 6, 7, 8];

    const renderSectionHeader = ({ item, index }) => {
        const animatedStyle = FadeInDown.delay(index * 100).duration(200).springify().damping(12);
        return (
            <Animated.View entering={animatedStyle}>
                <View style={styles.itemContainer}>
                    <CategoryCard key={index} />
                </View>
            </Animated.View>
        );
    };


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
            data={DATA2}
            numColumns={4}
            renderItem={renderSectionHeader}
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
        backgroundColor:'#fff',
        flex:1
    },
    itemContainer: {
        width: itemWidth,
        marginBottom: 10,
    },
});

export default Category;
