import { ImageBackground, StyleSheet, Image, View } from 'react-native'
import React from 'react'

const Background = () => {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../images/login.png')} resizeMode="cover" style={styles.bg}>
                <Image source={require('../../images/LogoMain.png')} style={styles.image} />
            </ImageBackground>
        </View>
    );

}

export default Background

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        height: 56,
        width: '100%',
        resizeMode: 'contain'
    }
})