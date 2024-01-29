import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS } from '../constants/COLORS'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'


const CustomInput = ({ left, right, color, passwd, control, name, placeholder }) => {

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
            style={styles.input}
          >
            {
              left && (
                <View style={styles.icon}>
                  <IonIcons name={left} size={23} color={color} />
                </View>
              )
            }
            <TextInput
              style={[styles.textInput, passwd && { borderRadius: 0 }]}
              secureTextEntry={hidePasswd}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor={COLORS.text}
            />

            {passwd && (
              <TouchableOpacity onPress={handlePasswd} style={styles.icon}>
                <IonIcons name={hidePasswd ? 'eye-off' : 'eye'} size={23} color={COLORS.dark_gray} />
              </TouchableOpacity>
            )}
          </View>

          {error && <Text style={styles.error}>{error?.message}</Text>}
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
    marginBottom: 20,
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
    color: COLORS.light
  },
  error: {
    fontSize: 22,
    color: COLORS.red,
    textAlign: 'left'
  }
})

export default CustomInput
