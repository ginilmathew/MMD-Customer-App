import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { storage } from '../../App'
import { COLORS } from '../constants/COLORS'


const Toast = ({ error, success }) => {


    useEffect(() => {
        if (error || success) {
            setTimeout(() => {
                storage.setString('error', "");
                storage.setString('success', "");
            }, 2000);
        }
    }, [error, success])


    if (!error && !success) {
        return;
    }

    return (
        <View style={styles.container}>
            <View style={[styles.message, { backgroundColor: error ? COLORS.red : COLORS.light }]}>
                <Text style={styles.messageText}>{error || success}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        flexBasis: .8,
        zIndex: 50,
        alignSelf: 'center'
    },
    message: {
        padding: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
    },
    messageText: {
        textAlign: 'center',
        color: COLORS.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 13
    }
})

export default Toast