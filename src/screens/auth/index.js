import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Login = () => {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../images/login.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Inside</Text>
            </ImageBackground>
        </View>
    );

}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

})