import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import COLORS from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';
const ItemBox = ({ onPress, key, item, index }) => {

    const styles = makeStyle(COLORS)
    
    return (
        <Animated.View key={key} entering={FadeInDown.delay(index * 300).duration(400).springify().damping(12)}>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                {item?.image ? (

                    <ImageBackground source={{ uri: item?.image }} style={styles.imgBox}>
                        <Text style={styles.text}>{item?.name}</Text>
                    </ImageBackground>

                ) : (<View style={styles.box}>
                    <Text style={styles.text}>{item?.name}</Text>
                </View>)}
                <View style={styles.shade}>
                    <Text style={styles.text}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 3.7; // Divide by the number of columns

const makeStyle = (color) => StyleSheet.create({
    container: {
        width: itemWidth,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    box: {
        width: itemWidth,
        height: 100,
        backgroundColor: color.primary, // Box background color
        borderRadius: 12, // Optional: Add border radius for rounded corners
        justifyContent: 'center', // Center text vertically
        alignItems: 'center',
        textAlign: 'center', // Center text horizontally
        // elevation: 5, // For Android shadow
    },
    text: {
        color: '#fff', // Text color
        fontSize: 12,
        letterSpacing: 1.5,
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        width: "80%",
     
    },
    imgBox: {
        width: itemWidth,
        height: 100,
        borderRadius: 12, // Border radius for rounded corners
        overflow: 'hidden', // Ensure that the image respects the borderRadius
        justifyContent: 'center', // Center text vertically
        alignItems: 'center',
        textAlign: 'center', // Center text horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // elevation: 5, // For Android shadow
    },
    shade: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100%",
        height: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ItemBox;
