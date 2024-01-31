import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import IonIcon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/COLORS'
import Animated, { FadeInDown } from 'react-native-reanimated'


const ProfileButton = ({ text, onPress }) => {


    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.text}>{text}</Text>

            <Animated.View entering={FadeInDown.delay(2 * 100).duration(200).springify().damping(12)}>
                <IonIcon name='arrowright' color={COLORS.primary} size={20} />
            </Animated.View>

        </TouchableOpacity>
    )
}

export default memo(ProfileButton)

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