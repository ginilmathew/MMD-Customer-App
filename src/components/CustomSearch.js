import { StyleSheet, TextInput, Image, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/COLORS'


const CustomSearch = ({ placeholder, placeHoldeColor, keyboardType, onPress, onChangeText, readonly, autoFocus, values }) => {

    const textRef = useRef(null);

    // useFocusEffect(
    //     useCallback(() => {
    //         // When the screen is focused
    //         const focus = () => {
    //             setTimeout(() => {
    //                 textRef?.current?.focus();
    //             }, 1);
    //         };
    //         focus();
    //         return focus; // cleanup
    //     }, []),
    // );

    return (

        <>
            <View
                style={{
                    backgroundColor: COLORS.dark_gray,
                    borderRadius: 15,
                    marginTop: 5,
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 5 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 1,
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                }}
            >
                <TextInput
                    ref={textRef}
                    onPressIn={onPress}
                    isReadOnly={readonly}
                    onChangeText={onChangeText}
                    value={values}
                    variant="unstyled"
                    placeholder={placeholder}
                    backgroundColor={COLORS.dark_gray}
                    placeholderTextColor={placeHoldeColor ? placeHoldeColor : '#0C256C21'}
                    borderColor={0}
                    keyboardType={keyboardType}
                    paddingLeft={20}
                    flex={1}
                    fontFamily='Poppins-SemiBold'
                    fontSize={12}
                    borderRadius={15}
                    color='#000'
                    autoFocus={autoFocus}
                />
                <View style={styles.iconBox}>
                    <Ionicons name='search' color={COLORS.blue} size={25} />
                </View>

            </View>

        </>
    )
}

export default CustomSearch


const styles = StyleSheet.create({
    iconBox: {
        marginRight: 10
    }
})