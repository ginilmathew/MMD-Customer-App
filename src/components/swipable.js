import React, { useState } from 'react';
import { View, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Swipable = (props) => {
  const screenWidth = useWindowDimensions().width;
  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(0);
  const [loaded, setLoaded] = useState(false);
  const showDeleteButton = useSharedValue(false); // Added shared value to control delete button visibility

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      // Show delete button when swiping to the right and in the middle of the swipe
      showDeleteButton.value = translateX.value > 50 && translateX.value < 150;
    },
    onEnd: (_) => {
      if (translateX.value > 100) {
        translateX.value = withTiming(screenWidth, {}, () => {
          scaleX.value = withTiming(0);
        });
      } else {
        translateX.value = withSpring(0);
      }
      // Hide delete button when swipe ends
      showDeleteButton.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const height = useAnimatedStyle(() => {
    return {
      height: scaleX.value,
    };
  });

  const animatedHeight = !loaded ? { height: 'auto' } : height;
  const backgroundColor = props.backgroundColor || '#fff';

  return (
    <>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={gestureHandler}
      >
        <Animated.View
          style={[animatedHeight]}
          onLayout={(e) => {
            if (!loaded) {
              scaleX.value = e.nativeEvent.layout.height;
              setLoaded(true);
            }
          }}
        >
          <Animated.View style={[animatedStyle, { backgroundColor }]}>
            {props.children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      {showDeleteButton.value && ( // Show delete button based on the value of showDeleteButton
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'red',
          }}
          onPress={() => console.log('Delete button pressed')}
        >
          <Text style={{ color: 'green' }}>Delete</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Swipable;
