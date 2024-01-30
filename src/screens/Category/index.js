import React from 'react';
import { FlatList, StyleSheet, View, Dimensions, useWindowDimensions } from 'react-native';

import CategoryCard from '../../components/CategoryCard';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';

const Category = () => {
const {width} =useWindowDimensions()

  const DATA2 = [1, 2, 3, 4, 5, 6, 7, 8];

  const renderSectionHeader = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <CategoryCard key={index} />
    </View>
  );

  return (
    <>
      <Header />
      <CommonHeader heading={"Categories"} backBtn={true}/>
      <FlatList
        data={DATA2}
        numColumns={4}
        renderItem={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 4; // Divide by the number of columns

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal:2, // Adjust the value based on the desired gap
  },
  itemContainer: {
    width: itemWidth,
    marginBottom: 10,
  },
});

export default Category;
