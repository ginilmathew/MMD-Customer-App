import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
const DummySearch = ({ press }) => {
    return (
        <Pressable onPress={press} >
            <View style={{
                backgroundColor: COLORS.gray,
                borderRadius: 15,
                shadowOffset: { width: 1, height: 5 },
                marginHorizontal: 20,
                padding: 10
            }}>
                <View style={styles.iconBox}>
                    <Text style={styles.textStyle}>Search Products...</Text>
                    <Ionicons name='search' color={COLORS.blue} size={25} />
                </View>
            </View>


        </Pressable>
    )
}

export default DummySearch

const styles = StyleSheet.create({
    iconBox: {
        flexDirection: "row",
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    textStyle: {
    fontFamily: "Poppins-Italic",
    color: COLORS.light,
    opacity: 0.5,

    }
})