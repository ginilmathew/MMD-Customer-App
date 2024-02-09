import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/COLORS'

const CommonHeader = ({ heading, backBtn, onPress }) => {

    const navigation = useNavigation()

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

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
        backgroundColor: COLORS.white
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
        borderBottomWidth: 0.5,
        borderBottomColor: "#F1F1F1",
        width: "100%",
        shadowColor: "#646464",
        elevation: 3,
        zIndex: 99
        
    }
})