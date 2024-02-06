import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../constants/COLORS'
import LottieView from 'lottie-react-native'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'

const ProcessingOrder = () => {
    
    return (
        <View style={styles.container}>
                <LottieView source={require('../../lottie/processing.json')} autoPlay loop style={styles.lottieStyle} />
                <Text style={styles.textStyle}>Processing Payment...</Text>
        </View>
    )
}

export default ProcessingOrder

const styles = StyleSheet.create({
    lottieStyle: {
        width: 400,
        height: 400,
        marginTop: -200
    },
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        fontFamily: "Poppins-Italic",
        color: COLORS.light,
        opacity: 0.5,
        fontSize: 15,
        marginTop: -120,
        letterSpacing: 2
    }
})