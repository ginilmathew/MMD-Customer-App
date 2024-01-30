import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const CommonButton = ({ text, mb, mt, onPress }) => {

    return (
        <View style={[styles.container, { marginTop: mt, marginBottom: mb }]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: '100%',
        width: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22,
        color: COLORS.white,
        letterSpacing: .5,
        fontFamily: "Poppins-SemiBold",
    }
})

export default CommonButton