import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SkeletonItemCard = ({ opacity, key }) => {
    return (
        <Animated.View style={[styles.container, { opacity }]} entering={FadeInDown.easing().delay(400)} key={key}>
            {/* Left Side - Image Placeholder */}
            <Animated.View style={[styles.leftContainer, { opacity }]} />

            {/* Center Content */}
            <Animated.View style={[styles.centerContainer, { opacity }]}>
                <Animated.View style={[styles.headingPlaceholder, { opacity }]} />
                <Animated.View style={[styles.subHeadingPlaceholder, { opacity }]} />
                <Animated.View style={[styles.offerBoxPlaceholder, { opacity }]} />
            </Animated.View>

            {/* Right Side - Price and Add To Cart Button */}
            <Animated.View style={[styles.rightContainer, { opacity }]}>
                <Animated.View style={[styles.topPricePlaceholder, { opacity }]} />
                <Animated.View style={[styles.buttonPlaceholder, { opacity }]} />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ddd',
        borderRadius: 8,
        marginVertical: 8,
    },
    leftContainer: {
        flex: 0.3,
        marginRight: 14,
        backgroundColor: 'gainsboro', // Placeholder color
        borderRadius: 8,
        height: 80,
    },
    centerContainer: {
        flex: 0.5,
    },
    headingPlaceholder: {
        width: '70%',
        backgroundColor: 'gainsboro', // Placeholder color
        height: 12,
        borderRadius: 6,
        marginBottom: 4,
    },
    subHeadingPlaceholder: {
        width: '50%',
        backgroundColor: 'gainsboro', // Placeholder color
        height: 10,
        borderRadius: 6,
        marginBottom: 4,
    },
    offerBoxPlaceholder: {
        width: 100,
        backgroundColor: 'gainsboro', // Placeholder color
        height: 12,
        borderRadius: 6,
    },
    rightContainer: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
    topPricePlaceholder: {
        width: 50,
        backgroundColor: 'gainsboro', // Placeholder color
        height: 16,
        borderRadius: 6,
        marginBottom: 8,
    },
    buttonPlaceholder: {
        width: 80,
        backgroundColor: 'gainsboro', // Placeholder color
        height: 30,
        borderRadius: 6,
    },
});

export default SkeletonItemCard;
