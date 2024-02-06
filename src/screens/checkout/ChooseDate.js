import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import reactotron from 'reactotron-react-native'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomInput from '../../components/CustomInput'
import { COLORS } from '../../constants/COLORS'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const ChooseDate = ({ }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    reactotron.log(moment(`${moment(date).format("YYYY-MM-DD")} ${moment().format("HH:mm")}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"), "dtae")


    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity title="Open" onPress={() => setOpen(true)} style={styles.input}>
                <View>
                    <Text style={styles.txtBtn}>Choose Delivery Date</Text>

                    <DatePicker
                        modal
                        open={open}
                        mode='date'
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>

                <Ionicons name="calendar" size={20} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default ChooseDate

const styles = StyleSheet.create({
    input: {
        height: 56,
        width: '100%',
        backgroundColor: COLORS.gray,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 15
    },
    txtBtn: {
        fontFamily: "Poppins-Italic"
    }
})