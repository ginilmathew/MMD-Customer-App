import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import COLORS from '../constants/COLORS'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'


const CustomInput = ({ left, right, color, passwd, control, name, placeholder, type, autoFocus, multi }) => {

  const [hidePasswd, setShowPasswd] = useState(passwd);


  const handlePasswd = useCallback(() => {
    setShowPasswd(!hidePasswd);
  }, [hidePasswd])

  const styles = style(passwd, right, left, multi)

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
              style={styles.textInput}
              secureTextEntry={hidePasswd}
              onChangeText={onChange}
              multiline={multi}
              numberOfLines={23}
              placeholder={placeholder}
              placeholderTextColor={COLORS.text}
              keyboardType={type}
              autoFocus={autoFocus}
              textAlignVertical={name === 'comments' ? 'top' : 'center'}
              maxLength={name === 'mobile' ? 10 : null}
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


const style = (passwd, right, left, multi) => StyleSheet.create({
  input: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: multi ? 120 : 55
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
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: COLORS.gray,
    color: COLORS.light,
    fontFamily: 'Poppins-Italic',
    borderRadius: passwd ? 0 : 23, 
    paddingHorizontal: !left && !right ? 20 : 0,
    minHeight: multi ? 120 : 55
  },
  error: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.red,
    textAlign: 'left',
    fontFamily: "Poppins-Regular"
  }
})

export default CustomInput
