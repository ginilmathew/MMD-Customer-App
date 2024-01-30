import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CategoryCard = ({ key }) => {
    return (
        <TouchableOpacity style={styles.container} key={key}>
            <Image source={require('../images/spinach.jpg')} style={styles.image} />
            <Text style={styles.text}>Spinach</Text>
        </TouchableOpacity>
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
    },
});
