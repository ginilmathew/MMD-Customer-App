import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import { useMutation } from 'react-query'
import { ChooseSlot } from '../../api/ChooseSlot'
import SlotContext from '../../context/slot'

const ChooseDate = ({slotSelected}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [chosenDate, setChosenDate] = useState(null)
    const [storeData, setStoreData] = useState(null)

    const { setUseSlot } = useContext(SlotContext);

    reactotron.log(storeData?.data?.data, "storeData")

    const handleDateChange = (selectedDate) => {
        const formattedDate = moment(`${moment(selectedDate).format("YYYY-MM-DD")} ${moment().format("HH:mm")}`, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        setDate(selectedDate)
        setChosenDate(formattedDate)
        setOpen(false)
        if (selectedDate) {
            mutate({
                date: formattedDate
            })
        }
    }

    const { mutate, refetch: postsubrefetch } = useMutation({
        mutationKey: 'SlotPlace',
        mutationFn: ChooseSlot,
        onSuccess: (data) => {
            reactotron.log(data, "DAYS")
            setStoreData(data)
        }
    })

    

    const [visible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    reactotron.log(selectedValue, "selectedValue")

    const handleToggleDropdown = () => {
        setVisible(!visible);
    };

    const handleSelectOption = (value) => {
        reactotron.log(value, "VAlUE")
        setSelectedValue(value);
        setVisible(false);
    };

    useEffect(() => {
      if(chosenDate && selectedValue) {
        setUseSlot({
            date: chosenDate,
            idData : selectedValue
        })
      }
    }, [chosenDate, selectedValue])
    

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
                        //minimumDate={new Date()}
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
                        <Text style={styles.buttonText}>{selectedValue?.fromTime ? selectedValue.fromTime + "~" + selectedValue.toTime  : 'Select an option'}</Text>
                        <Ionicons name="chevron-down" size={20} color="black" />
                    </TouchableOpacity>

                    {visible && (
                        <View style={styles.dropdown}>
                            {storeData?.data?.data?.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectOption(item)}>
                                    <Text style={{color: COLORS.light, fontFamily: "Poppins-Medium" }}>{item?.fromTime} ~ {item?.toTime}</Text>
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
        top: 10
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
    },
    buttonText: {
        flex: 1,
        marginRight: 10,
        fontFamily: "Poppins-Medium"
    },
    dropdown: {

        width: '100%',
        borderWidth: 0.5,
        borderColor: '#f2f2f2',
        borderRadius: 12,
        backgroundColor: "#e8e8e8",
    },
    option: {
        zIndex: 100,
        padding: 10,
    },
})