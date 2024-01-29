import { ImageBackground, StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/COLORS';


const Background = ({ headline, subhead, children, onPress, link, description }) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../images/login.png')} resizeMode="cover" style={styles.bg}>

                <View style={styles.img}>
                    <Image source={require('../../images/LogoMain.png')} style={styles.image} />
                </View>

               <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps='always'>
                    <View style={styles.headline}>
                        <Text style={styles.text_headline}>{headline}</Text>
                    </View>

                    <Text style={styles.subHead}>{subhead}</Text>

                    {children}


                    <View style={styles.footer}>
                        <Text style={styles.description}>{description}</Text>
                        <View style={styles.line} />

                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.link}>{link}</Text>
                        </TouchableOpacity>
                    </View>
               </ScrollView>
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
        padding: 21
    },
    img: {
        height: '20%',
        marginBottom: 'auto',
    },
    image: {
        height: 56,
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
        paddingBottom: 6.5,
        marginBottom: 4.5
    },
    text_headline: {
        color: COLORS.light,
        fontSize: 30,
        fontWeight: '600',
        letterSpacing: .5
    },
    subHead: {
        color: COLORS.text,
        fontSize: 15,
        marginBottom: 23
    },
    link: {
        color: COLORS.blue,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        color: COLORS.light
    },
    line: {
        borderBottomWidth: 1,
        width: '40%',
        borderBottomColor: COLORS.gray,
        alignSelf: 'center',
        marginVertical: 6.5
    },
    footer: {
        marginTop: 56
    }
})