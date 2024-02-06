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
import CustomDropdown from '../../components/CommonDropDown'

const ChooseDate = ({ }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [chosenDate, setChosenDate] = useState(null)

    reactotron.log(chosenDate, "chosenDate")

    const handleDateChange = (selectedDate) => {
        const formattedDate = moment(`${moment(selectedDate).format("YYYY-MM-DD")} ${moment().format("HH:mm")}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        setDate(selectedDate)
        setChosenDate(formattedDate)
        setOpen(false)
    }

    const data = [
        {
            "_id": "65c1d6af7dab38aeda08f272",
            "day": "Tuesday",
            "fromTime": "15:00",
            "toTime": "17:00",
        },
        {
            "_id": "65c1d6af7dab38aeda08f272",
            "day": "wed",
            "fromTime": "15:00",
            "toTime": "17:00",
        },
        // Add more data objects as needed
    ];

    const [visible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleToggleDropdown = () => {
        setVisible(!visible);
    };

    const handleSelectOption = (value) => {
        setSelectedValue(value);
        setVisible(false);
    };

    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity title="Open" onPress={() => setOpen(true)} style={styles.input}>
                <View>
                    {chosenDate ? (
                        <Text style={styles.txtBtn}>{moment(chosenDate).format("DD-MM-YYYY")}</Text>
                    ) : (
                        <Text style={styles.txtBtn}>Choose Delivery Date</Text>
                    )}


                    <DatePicker
                        modal
                        open={open}
                        mode='date'
                        date={date}
                        onConfirm={handleDateChange}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>

                <Ionicons name="calendar" size={20} color="black" />
            </TouchableOpacity>

            {chosenDate && (
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleToggleDropdown} style={styles.button}>
                        <Text style={styles.buttonText}>{selectedValue?.day ? selectedValue.day : 'Select an option'}</Text>
                        <Ionicons name="chevron-down" size={20} color="black" />
                    </TouchableOpacity>

                    {visible && (
                        <View style={styles.dropdown}>
                            {data.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectOption(item)}>
                                    <Text>{item?.day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}

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
    },
    container: {
        position: 'relative',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonText: {
        flex: 1,
        marginRight: 10,
    },
    dropdown: {
        zIndex: 1000,
        position: 'absolute',
        top: 40, // Adjust the distance from the button
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'red',
    },
    option: {
        zIndex: 100,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})