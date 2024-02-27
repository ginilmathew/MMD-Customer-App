import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'

const CommonButton = ({ text, mb, mt, onPress, w, loading }) => {

    return (
        <View style={[styles.container, { marginTop: mt, marginBottom: mb, width: w || '100%', alignSelf: 'center' }]}>
            <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.primary}]} onPress={loading ? null : onPress}>
                {
                    loading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) :
                        (
                            <Text style={styles.text}>{text}</Text>
                        )
                }
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
        justifyContent: 'center',
        elevation: 3,
        shadowColor: "#2F2F2F",
        shadowRadius: 15
    },
    text: {
        fontSize: 22,
        color: COLORS.white,
        letterSpacing: .5,
        fontFamily: "Poppins-SemiBold",
    }
})

export default CommonButton