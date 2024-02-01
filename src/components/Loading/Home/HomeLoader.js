import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../../constants/COLORS'
import useOpacityAnimation from '../../../hooks/animationHook'
import Animated, { FadeInDown, useAnimatedStyle } from 'react-native-reanimated'
import CustomHeading from '../../CustomHeading'
import SkeletonItemCard from './ItemSkelton'



const HomeLoader = () => {

  const { width } = useWindowDimensions()

  const opacity = useOpacityAnimation();

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.dummySearch, { opacity }]}  entering={FadeInDown.easing().delay(100)}>
          <View style={styles.iconBox}>
            <Ionicons name='search' color={COLORS.blue} size={25} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.sliderBox, { opacity }]} entering={FadeInDown.easing().delay(200)}>
        </Animated.View>
        <CustomHeading label={'Categories'} hide={false} marginH={0} />
        <View style={[styles.categorymain]}>
          {Array(5).fill().map((_, index) => (
            <Animated.View key={index} style={[styles.category, { opacity }]} entering={FadeInDown.easing().delay(300)}/>
          ))}
        </View>
        <CustomHeading label={'Popular Products'} hide={false} marginH={0} />
        {Array(3).fill().map((_, index) => (
          <SkeletonItemCard opacity={opacity}  key={index}/>))}
      </Animated.View>
    </Animated.View>
  )
}

export default HomeLoader

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {

    marginHorizontal: 10,
  },
  dummySearch: {
    backgroundColor: 'gainsboro',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    shadowOffset: { width: 1, height: 5 },
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'flex-end',

  },
  iconBox: {
    marginRight: 10
  },
  sliderBox: {
    marginVertical: 10,
    height: 130,
    borderRadius: 8,
    backgroundColor: 'gainsboro',

  },
  categorymain: {
    flexDirection: 'row',
    gap: 10,

  },
  category: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'gainsboro',

  }
})