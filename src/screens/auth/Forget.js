import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import Background from './Background'
import CustomInput from '../../components/CustomInput'
import CommonButton from '../../components/CommonButton'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { COLORS } from '../../constants/COLORS'
import OTPInput from 'react-native-otp-textinput'
import { useMutation } from 'react-query'
import { forgetApi, otpApi } from '../../api/auth'
import { storage } from '../../../App'


const Forget = ({ navigation }) => {

  const [forget, setForget] = useState(true);

  const schema = yup.object(forget ? {
    email: yup.string().email('Please enter valid email address').required('Email is required'),
  } : { otp: yup.string().matches(/\d{6}/, 'OTP must be 6 digits').required("OTP required").typeError("OTP required") })

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema)
  })


  const onSuccessForget = () => {
    storage.setString('success', 'OTP has been successfully sent')
    setForget(false)
  }

  const onSuccessOtp = ({ data }) => {
    storage.setString('success', 'Verification Successful')
    navigation.navigate("ChangePasswd", { user: data?.data })
  
   
  }

  const { mutate } = useMutation({
    mutationKey: ['forget-query'],
    mutationFn: forgetApi,
    onSuccess: onSuccessForget
  })

  const { mutate: mutateOtp, isLoading } = useMutation({
    mutationKey: ['otp-query'],
    mutationFn: otpApi,
    onSuccess: onSuccessOtp
  })


  const goBack = useCallback(() => {
    navigation?.goBack()
  }, [navigation]);


  const otpSubmit = ({ otp }) => {
    mutateOtp({ email: getValues()?.email, otp })
  }

  return (
    <Background headline={forget ? 'FORGET PASSWORD' : 'OTP'}
      subhead={forget ? 'Enter your registered email address' : 'Enter the OTP sent to your registered email'}
      onPress={goBack}
      description={forget ? 'Remember your password?' : 'Something wrong?'}
      link={forget ? 'Go To Login' : 'Go Back'}
    >

      {
        forget ? (
          <CustomInput
            control={control}
            left={'mail'}
            color={COLORS.blue}
            name={'email'}
            placeholder={'Email Address'}
            type={'email-address'}
          />

        ) : (
          <Controller
            control={control}
            name='otp'
            render={({ field: { onChange }, fieldState: { error } }) => (
              <View style={styles.container}>
                <OTPInput
                  inputCount={6}
                  containerStyle={{
                    justifyContent: 'center',
                  }}
                  handleTextChange={onChange}
                  tintColor={'transparent'}
                  offTintColor={'transparent'}
                  textInputStyle={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 10,
                  }}
                />

                {error && <Text style={styles.error}>{error?.message}</Text>}
              </View>
            )}
          />
        )
      }

      <CommonButton text={forget ? 'Confirm' : 'Proceed'} loading={isLoading} mt={!forget && 30} onPress={handleSubmit(forget ? mutate : otpSubmit)} />

    </Background>
  )
}

export default Forget

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  error: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'left',
  }
})