import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CommonHeader = ({ heading, backBtn, onPress }) => {

    const navigation = useNavigation()

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                {backBtn && <TouchableOpacity onPress={onPress ? onPress : goBack}>
                    <Ionicons name={"chevron-back"} size={30} color='#000' />
                </TouchableOpacity>}
                <Text style={styles.headingStyle}>{heading}</Text>
            </View>
        </View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'android' ? 60 : 100,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'flex-end'
    },
    insideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5
    },
    headingStyle: {
        fontSize: 25,
        fontFamily: "Poppins-Medium"
    }
})