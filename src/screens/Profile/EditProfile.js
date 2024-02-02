import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import CustomInput from '../../components/CustomInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonButton from '../../components/CommonButton'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import { useMutation } from 'react-query'
import { updateProfile } from '../../api/Profile'


const EditProfile = ({ navigation }) => {

    const [user] = useMMKVStorage('user', storage);

    const { mutate } = useMutation({
        mutationKey: 'update-query', 
        mutationFn: updateProfile,
        onSuccess({ data }) {
            storage.setString('success', data?.message)
            navigation?.goBack()
        }
    })


    const schema = yup.object({
        email: yup.string().email('Please type valid Email').required('Email required'),
        mobile: yup.string().matches(/^[0-9]*$/).required('Phone is required'),
        name: yup.string().required('Name is required')
    });

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            email: user?.user?.email || null,
            mobile: user?.user?.mobile || null,
            name: user?.user?.name || null
        }
    });


    return (
        <>
            <CommonHeader heading={'Edit Profile'} backBtn />

            <View style={styles.container}>
                <CustomInput
                    control={control}
                    name='name'
                    placeholder={'Name'}
                />

                <CustomInput
                    name='email'
                    control={control}
                    placeholder={'Email'}
                />

                <CustomInput
                    name='mobile'
                    control={control}
                    placeholder={'Mobile'}
                    type={'number-pad'}
                />

                <CommonButton text={'update'} mt='auto' onPress={handleSubmit(mutate)} />
            </View >
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

export default EditProfile