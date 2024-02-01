import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS } from '../constants/COLORS';

const CategoryCard = ({ key }) => {

    const navigation = useNavigation()

    const NavigateToSingle = useCallback(() => {
        navigation.navigate('SingleCategory')
    }, [navigation])

    return (
        <Animated.View entering={FadeInDown.easing().delay(200)}>
            <TouchableOpacity style={styles.container} key={key} onPress={NavigateToSingle}>
                <Image source={require('../images/spinach.jpg')} style={styles.image} />
                <Text style={styles.text}>Spinach</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',


    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color:COLORS.light
    },
});
