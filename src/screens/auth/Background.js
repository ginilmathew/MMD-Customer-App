import { ImageBackground, StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../constants/COLORS';


const Background = ({ headline, subhead, children, onPress, link, description }) => {


    const handlePress = useCallback(() => {
        Keyboard.dismiss();
        onPress();
    }, [])

    return (
        <ImageBackground source={require('../../images/login.png')} resizeMode="cover" style={styles.bg}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

                <View style={styles.img}>
                    <Image source={require('../../images/LogoMain.png')} style={styles.image} />
                </View>

                <View style={styles.headline}>
                    <Text style={styles.text_headline}>{headline}</Text>
                </View>

                <Text style={styles.subHead}>{subhead}</Text>

                {children}

                <View style={styles.footer}>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.line} />

                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.link}>{link}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );

}

export default Background

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: 'center',
        padding: 21
    },
    img: {
        height: 150,
        marginBottom: 'auto',
    },
    image: {
        height: 73,
        width: '100%',
        resizeMode: 'contain',
        marginTop: 'auto'
    },

    content: {
        flex: 1,
        marginTop: 28,
    },

    headline: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        // paddingBottom: 6.5,
        marginTop: 23,
        marginBottom: 4.5
    },
    text_headline: {
        color: COLORS.light,
        fontSize: 30,
        fontWeight: '500',
        letterSpacing: .5,
        fontFamily: 'Poppins-SemiBold'
    },
    subHead: {
        color: COLORS.light,
        opacity: 0.5,
        fontSize: 15,
        marginBottom: 23,
        fontFamily: "Poppins-Regular"
    },
    link: {
        color: COLORS.blue,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    },
    description: {
        textAlign: 'center',
        color: COLORS.light,
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        opacity: 0.8
    },
    line: {
        borderBottomWidth: 1,
        width: '40%',
        borderBottomColor: COLORS.gray,
        alignSelf: 'center',
        marginVertical: 5.5
    },
    footer: {
        marginTop: 56
    }
})