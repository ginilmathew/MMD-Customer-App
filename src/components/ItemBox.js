import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
const ItemBox = ({ onPress, index }) => {
    return (
        <Animated.View entering={FadeInDown.delay(index * 300).duration(400).springify().damping(12)}>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.box}>
                    <Text style={styles.text}>Offer Products</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 3.9; // Divide by the number of columns

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: itemWidth,
        height: 100,
        backgroundColor: COLORS.primary, // Box background color
        borderRadius: 8, // Optional: Add border radius for rounded corners
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // elevation: 5, // For Android shadow
    },
    text: {
        color: '#fff', // Text color
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle:'italic',
        letterSpacing:1,
    },
});

export default ItemBox;
