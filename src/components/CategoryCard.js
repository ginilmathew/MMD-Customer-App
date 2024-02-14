import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS } from '../constants/COLORS';

const CategoryCard = ({ key,item }) => {


    const navigation = useNavigation()

    const NavigateToSingle = useCallback(() => {
        navigation.navigate('SingleCategory',{item: item?.slug})
    }, [navigation])
//   const animationStyle= FadeInDown.easing().delay(200)
    return (
        <Animated.View key={key}>
            <TouchableOpacity style={styles.container} key={key} onPress={NavigateToSingle}>
                <Image source={{uri:item?.image}} style={styles.image} />
                <Text style={styles.text}>{item?.name}</Text>
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
        borderRadius: 25,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color:COLORS.light,
        opacity: 0.8,
        textAlign: "center"
    },
});
