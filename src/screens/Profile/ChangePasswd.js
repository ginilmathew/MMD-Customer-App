import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import CustomInput from '../../components/CustomInput'
import CommonButton from '../../components/CommonButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import { useMutation } from 'react-query'
import { changePasswd } from '../../api/Profile'
import { storage } from '../../../App'
import { navigationRef } from '../../navigation/RootNavigation'
import Header from '../../components/Header'


const ChangePasswd = ({ navigation, route }) => {

  const { mutate } = useMutation({
    mutationKey: 'change-query',
    mutationFn: changePasswd,
    onSuccess({ data }) {
      storage.setString('success', data?.message)
      
      if(route?.params?.user) {
        navigationRef.navigate('Login')
      } else {
        navigation?.goBack()
      }
    }
  })

  const schema = yup.object({
    password: yup.string().required('Password is required'),
    confPasswd: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('Confirm Password required.'),
    user_id: yup.string().nullable()
  });


  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user_id: route?.params?.user
    }
  });

  const navToLogin = useCallback(() => {
    navigationRef.navigate('Login')
  }, [])

  return (
    <>
      <Header />

      <CommonHeader heading={route?.params?.user ? 'Reset Password' : 'Change Password'} backBtn onPress={route?.params?.user ? navToLogin : null} />
      <View style={styles.container}>
      
        <CustomInput
          name='password'
          control={control}
          placeholder={'Password'}
          passwd
        />

        <CustomInput
          name='confPasswd'
          control={control}
          placeholder={'Confirm Password'}
          passwd
        />

        <CommonButton text={'update'} mt='auto' onPress={handleSubmit(mutate)} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 30
  }
})

export default ChangePasswd