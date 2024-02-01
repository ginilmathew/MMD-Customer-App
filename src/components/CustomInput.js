import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS } from '../constants/COLORS'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'


const CustomInput = ({ left, right, color, passwd, control, name, placeholder, type, autoFocus }) => {

  const [hidePasswd, setShowPasswd] = useState(passwd);


  const handlePasswd = useCallback(() => {
    setShowPasswd(!hidePasswd);
  }, [hidePasswd])



  return (

    <Controller
      control={control}
      name={name}
      rules={{
        required: true
      }}
      render={({ fieldState: { error }, field: { onChange, value } }) => (
        <>
          <View
            style={[styles.input, { marginBottom: error ? 0 : 20 }]}
          >
            {
              left && (
                <View style={styles.icon}>
                  <IonIcons name={left} size={23} color={color} />
                </View>
              )
            }

            <TextInput
              value={value}
              style={[styles.textInput, passwd && { borderRadius: 0 }, { paddingHorizontal: !left && !right && 20 }]}
              secureTextEntry={hidePasswd}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor={COLORS.text}
              keyboardType={type}
              autoFocus={autoFocus}
              maxLength={name === 'mobile' && 10 || null}
            />

            {passwd && (
              <TouchableOpacity onPress={handlePasswd} style={styles.icon}>
                <IonIcons name={hidePasswd ? 'eye-off' : 'eye'} size={23} color={COLORS.text} />
              </TouchableOpacity>
            )}
          </View>

          {error && <Text style={[styles.error, { marginBottom: 20 }]}>{error?.message}</Text>}
        </>
      )} />
  )
}


const styles = StyleSheet.create({
  input: {
    height: 56,
    width: '100%',
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  icon: {
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    width: '15%',
    marginRight: 'auto',
  },
  textInput: {
    flex: 1,
    borderRadius: 23,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: COLORS.gray,
    color: COLORS.light,
    fontFamily: 'Poppins-Italic',
  },
  error: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'left'
  }
})

export default CustomInput
