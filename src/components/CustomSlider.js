import React, { memo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import reactotron from '../ReactotronConfig';

const CustomSlider = memo(({ item, onPress }) => {
  const { width, height } = useWindowDimensions();

  // const IMG_URL = 'YOUR_IMAGE_BASE_URL'; // Replace with your image base URL

  const CarouselCardItem = useCallback(({ item, index }) => {


    return (
      <TouchableOpacity
        key={item?._id}
        onPress={() => onPress(item)}
        style={{ alignItems: 'center', marginTop: 25, width: '100%', height: '85%' }}
      >
        <Image
          //   source={{ uri: `${IMG_URL}${item?.original_image}` }}
          source={{ uri: item?.image }}
          style={{ height: '100%', width: '95%', borderRadius: 20 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }, []);

  const IMGLEN = item?.length;

  return (
    <View style={[styles.container]}>

      <Carousel
        loop={IMGLEN > 1 ? true : false}

        width={width / 1 - 18}
        height={height / 4 - 22}
        autoPlay={IMGLEN > 1 ? true : false}
        data={item}
        renderItem={CarouselCardItem}
        lazy
      />
    </View>
  );
});

export default memo(CustomSlider);

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
