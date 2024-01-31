import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../constants/COLORS';


const CommonSelectDropdown = ({topLabel, placeholder, value, setValue, search,}) => {



    const [isFocus, setIsFocus] = useState(false);


    // const datas = data?.map(opt => {
    //     return {
    //         label: opt,
    //         value: opt
    //     }
    // }) 

    const datas = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];

    // const renderLabel = () => {
    //     if (values || isFocus) {
    //       return (
    //         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //           Dropdown label
    //         </Text>
    //       );
    //     }
    //     return null;
    // };

    const setFocus = () => {
        setIsFocus(true)
    }

    const offFocus = () => {
        setIsFocus(false)
    }

    const changeValue = (item) => {

        console.log({item})
        setValue(item.label);
        setIsFocus(false);
    }

    const rightIcon = () => (
        <Ionicons name={ isFocus ? 'arrow-down-circle-sharp' : 'arrow-down-circle-sharp'} size={25} color={COLORS.blue } />
    )
    

  return (
    <View>
        {/* {renderLabel()} */}
        <Text
            style={{
                fontFamily: 'Poppins-Regular',
                color: '#000',
                fontSize: 11,
                marginLeft:5
            }}
        >{topLabel}</Text>
        <Dropdown
            style={{
                height: 40,
                borderColor: 'gray',
                borderRadius: 10,
                paddingHorizontal: 8,
                backgroundColor:  '#F2F2F2',
                shadowOpacity: 0,
                shadowRadius: 5,
                elevation: 2,
                shadowOffset: { width: 1, height: 5 },
                marginTop:3,
            }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={datas}
            search = {search ? search : null} 
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={!isFocus ? placeholder ? placeholder : '' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={setFocus}
            onBlur={offFocus}
            onChange={changeValue}
            renderRightIcon={rightIcon}
            itemTextStyle={styles.dropdownText}
        />    
    </View>
  )
}

export default CommonSelectDropdown

const styles = StyleSheet.create({
    dropdown: {
        height: 48,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:'#F2F2F2',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        shadowOffset: { width: 1, height: 5 },
        marginTop:3,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13,
        color:'#23233C'
    },
    placeholderStyle: {
        fontSize: 13,
        color:'#23233C',
        fontFamily:'Poppins-LightItalic'
    },
    selectedTextStyle: {
        fontSize: 13,
        fontFamily:'Poppins-Regular',
        color:'#23233C',
    },
 
    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color:COLORS.text
    },
    dropdownText: {
        fontSize: 13,
        fontFamily:'Poppins-Regular',
        color:COLORS.text,
    },
})