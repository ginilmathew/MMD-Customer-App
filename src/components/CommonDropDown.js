import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomDropdown = ({ options }) => {
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
        <View style={styles.container}>
            <TouchableOpacity onPress={handleToggleDropdown} style={styles.button}>
                <Text style={styles.buttonText}>{selectedValue ? selectedValue : 'Select an option'}</Text>
                <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>

            {visible && (
                <View style={styles.dropdown}>
                    {options?.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectOption(option)}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};
export default CustomDropdown;
const styles = StyleSheet.create({
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
       zIndex:1000,
        position: 'absolute',
        top: 40, // Adjust the distance from the button
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'red',
    },
    option: {
        zIndex:100,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});


