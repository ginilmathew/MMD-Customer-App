import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../constants/COLORS'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { notStatus } from '../../api/NotificationList'

const NotificationCard = ({data, refetch}) => {

    const navigation = useNavigation();
    const { mutate } = useMutation({
        mutationKey: 'change-status',
        mutationFn: notStatus,
        onSuccess() {
            refetch();
            if(data?.subtype === 'order') {
                navigation.navigate('SingleOrder', { id: data?.order?._id })
            }
        }
    })

    const pressEffect = useCallback(() => {
        mutate({ id: data?._id })
    }, [data])

    return (
        <TouchableOpacity style={styles.container} 
        onPress={pressEffect}
        >
            <View style={styles.heading}>
                <Text style={styles.text1}>{data?.name}</Text>
                <Text style={styles.text2}>{moment(data?.created_at).format("DD-MM-YYYY hh:mm a")}</Text>
            </View>
            <View style={styles.heading2}>
                <Text style={styles.text3}>{data?.description}</Text>
                {data?.status === 'active' && <View style={styles.dotStyle} />}
            </View>
        </TouchableOpacity>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginTop: 5
    },
    heading: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "flex-end"
    },
    text1: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: COLORS.light
    },
    text2: {
        fontFamily: "Poppins-Italic",
        fontSize: 10,
        color: COLORS.light,
        opacity: 0.5
    },
    text3: {
        fontFamily: "Poppins-Light",
        fontSize: 14,
        color: COLORS.light,
        width: "90%"
    },
    heading2: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F2F2F2",
    },
    dotStyle: {
        padding: 5,
        backgroundColor: COLORS.red,
        width: 10,
        height: 10,
        borderRadius: 100
    }
})