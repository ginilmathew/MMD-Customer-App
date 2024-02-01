import { useEffect } from 'react';
import { useSharedValue, withRepeat, withSequence, withDelay, withTiming } from 'react-native-reanimated';

const useOpacityAnimation = () => {
    const opacity = useSharedValue(1);

    useEffect(() => {
        const animation = withRepeat(
            withSequence(
                withDelay(1000, withTiming(0.5, { duration: 1000 })),
                withTiming(1, { duration: 1000 })
              ),
            -1,
            false
        );

        opacity.value = animation;

        // Clean up the animation on unmount
        return () => {
            // Stop the animation or do any necessary cleanup
            opacity.value = withTiming(1);
        };
    }, [opacity]);

    return opacity;
};

export default useOpacityAnimation;
