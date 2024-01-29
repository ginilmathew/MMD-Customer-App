import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const CommonButton = ({ text, ...props }) => {

    const style = styles(props)

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.button}>
                <Text style={style.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = (mt, mb) => StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        marginBottom: mb || 10
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
        fontWeight: '700',
        fontSize: 22,
        color: COLORS.white,
        letterSpacing: .5,
        fontFamily: 'Poppins-ExtraBold'
    }
})

export default CommonButton