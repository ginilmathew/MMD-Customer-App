import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/COLORS'


const ProfileButton = ({ text, onPress }) => {


    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.text}>{text}</Text>

            <IonIcon name='arrowright' color={COLORS.primary} size={20} />
        </TouchableOpacity>
    )
}

export default ProfileButton

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1
    },
    text: {
        fontSize: 17,
        color: COLORS.dark,
        fontFamily: 'Poppins-Medium'
    }
})