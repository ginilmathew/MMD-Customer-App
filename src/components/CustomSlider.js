import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CustomSlider = memo(({ slider }) => {
  const { width, height } = useWindowDimensions();

  const IMG_URL = 'YOUR_IMAGE_BASE_URL'; // Replace with your image base URL

  const CarouselCardItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => CarouselSelect(item)}
        style={{ alignItems: 'center', marginTop: 20, width: '100%', height: '85%' }}
      >
        <Image
        //   source={{ uri: `${IMG_URL}${item?.original_image}` }}
        source={require('../images/spinach.jpg')}
          style={{ height: '100%', width: '95%', borderRadius: 20 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }, [IMG_URL]);

  const CarouselSelect = (selectedItem) => {
    // Handle selection logic
    console.log('Selected Item:', selectedItem);
  };

  const IMAGE_ARRAY = [{id:1}]
  return (
    <View style={[styles.container]}>
      <Carousel
        loop
        width={width/1.1}
        height={height / 5}
        autoPlay={false}
        data={IMAGE_ARRAY}
        renderItem={CarouselCardItem}
        lazy
      />
    </View>
  );
});

export default memo(CustomSlider);

const styles = StyleSheet.create({
  container: {
    marginVertical:10,
 
     height:120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
