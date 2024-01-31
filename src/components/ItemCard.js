import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Animated, { FadeInDown } from 'react-native-reanimated';

const CustomItemCard = ({ onPress }) => {
    return (
        <Animated.View entering={FadeInDown.easing().delay(300)}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    {/* Left Side */}
                    <View style={styles.leftContainer}>
                        <Image
                            source={require('../images/spinach.jpg')} // Replace 'path_to_your_left_image' with the actual path to your left image
                            style={styles.leftImage}
                        />
                    </View>

                    {/* Center Content */}
                    <View style={styles.centerContainer}>
                        <Text style={styles.heading}>Elite Premium Rice puttupodi 1kg </Text>
                        <Text style={styles.subHeading}>Category:Grocery</Text>
                        <View style={styles.offerBox}>
                            <Text style={styles.offerText}>Up to 10% off!</Text>
                        </View>
                    </View>

                    {/* Right Side */}
                    <View style={styles.rightContainer}>
                        <Text style={styles.topPrice}>₹200</Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
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
        // marginVertical: 8,
    },
    leftContainer: {
        flex: .3,
        marginRight: 14,
    },
    leftImage: {
        width: 80, // Set your desired width
        height: 80, // Set your desired height
        borderRadius: 8,
    },
    centerContainer: {
        flex: .5,
    },
    heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subHeading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontStyle: 'italic',
        color: COLORS.text,
        marginBottom: 4,
    },
    offerBox: {
        width: 100,
        backgroundColor: COLORS.Offer_box,
        padding: 2,
        borderRadius: 6,
    },
    offerText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: COLORS.status_cancelled
    },
    rightContainer: {
        flex: .3,
        alignItems: 'flex-end',
    },
    topPrice: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 6,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default memo(CustomItemCard);
