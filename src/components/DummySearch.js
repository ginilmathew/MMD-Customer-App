import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
const DummySearch = ({ press }) => {
    return (
        <Pressable onPress={press} >
            <View style={{
                backgroundColor: COLORS.dark_gray,
                borderRadius: 15,

                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 2,
                shadowOffset: { width: 1, height: 5 },
                flexDirection: 'row',
                alignItems: 'center',
                margin: 1,
                height: 40,
                justifyContent: 'flex-end',
                marginHorizontal: 20,
            }}>
                <View style={styles.iconBox}>
                    <Ionicons name='search' color={COLORS.blue} size={25} />
                </View>
            </View>


        </Pressable>
    )
}

export default DummySearch

const styles = StyleSheet.create({
    iconBox: {
        marginRight: 10
    }
})