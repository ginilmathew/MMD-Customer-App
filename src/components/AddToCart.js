import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'

const AddToCart = ({ isCartAdded, handleDecrement, handleAddToCart, handleIncrement, quantity }) => {

    if (isCartAdded) {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.incrementButton, { paddingHorizontal: 12, backgroundColor: COLORS.primary }]} onPress={handleDecrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{quantity}</Text>
                <TouchableOpacity style={[styles.incrementButton,{backgroundColor: COLORS.primary}]} onPress={handleIncrement}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <TouchableOpacity style={[styles.button,{backgroundColor: COLORS.primary}]} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
    )
}

export default AddToCart

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        width: 80,
        height: 27,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        letterSpacing: .5,

    },
    addText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Center the count between the buttons
        gap: 4,
    },
    incrementButton: {
        backgroundColor: COLORS.primary,
        width: 27,
        height: 27,
        borderRadius: 6,

        alignItems: "center",
        justifyContent: "center"
    },
    countText: {
        justifyContent: 'center',
        textAlign: 'center',
        minWidth: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.dark
    },
})