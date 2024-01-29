import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'

const SubHeading = ({ label }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{label}</Text>
        </View>
    )
}

export default SubHeading

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: COLORS.light
    },
    container: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#F2F2F2",
    }
})