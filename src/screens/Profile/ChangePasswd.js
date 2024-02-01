import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
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


const ChangePasswd = ({ navigation }) => {

  const { mutate } = useMutation({
    mutationKey: 'change-query',
    mutationFn: changePasswd,
    onSuccess({ data }) {
      storage.setString('success', data?.message)
      navigation?.goBack()
    }
  })

  const schema = yup.object({
    password: yup.string().required('Password is required'),
    confPasswd: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('Confirm Password required.')
  });


  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });


  return (
    <>
      <CommonHeader heading={'Change Password'} backBtn />
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