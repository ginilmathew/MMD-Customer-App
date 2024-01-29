import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/COLORS'

const CommonHeader = ({ heading, backBtn, onPress }) => {

    const navigation = useNavigation()

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.insideContainer}>
                    {backBtn && <TouchableOpacity onPress={onPress ? onPress : goBack} style={styles.backBTN}>
                        <Ionicons name={"chevron-back"} size={30} color='#000' />
                    </TouchableOpacity>}
                    <Text style={styles.headingStyle}>{heading}</Text>
                </View>
            </View>
            <View style={styles.borderStyle} />
        </>
    )
}

export default memo(CommonHeader);

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        alignItems: 'flex-start',
    },
    insideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    headingStyle: {
        fontSize: 25,
        fontFamily: "Poppins-Medium",
        color: COLORS.light,
        paddingLeft: 5
    },
    backBTN: {
        marginTop: -5
    },
    borderStyle: {
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#707070",
        opacity: 0.1,
        width: "100%"
    }
})