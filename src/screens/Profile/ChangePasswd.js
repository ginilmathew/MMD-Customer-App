import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import CustomInput from '../../components/CustomInput'
import CommonButton from '../../components/CommonButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'


const ChangePasswd = () => {


  const schema = yup.object({
    passwd: yup.string().required('Password is required'),
    confPasswd: yup.string().oneOf([yup.ref('passwd'), null], 'Password must match').required('Confirm Password required.')
  });


  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(() => {

  }, [])

  return (
    <>
      <CommonHeader heading={'Change Password'} backBtn />
      <View style={styles.container}>
      
        <CustomInput
          name='passwd'
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

        <CommonButton text={'update'} mt='auto' onPress={handleSubmit(onSubmit)} />
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