import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import CustomInput from '../../components/CustomInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonButton from '../../components/CommonButton'


const EditProfile = () => {

    // change the value 
    const user = {
        email: 'hello@gmail.com',
        mobile: '982392837',
        name: 'nazim'
    }

    const schema = yup.object({
        email: yup.string().email('Please type valid Email').required('Email required'),
        mobile: yup.string().matches(/^[0-9]*$/).required('Phone is required'),
        name: yup.string().required('Name is required')
    });

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            email: user?.email,
            mobile: user?.mobile,
            name: user?.name
        }
    });


    const onSubmit = useCallback((data) => {
        
    }, [])

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

                <CommonButton text={'update'} mt='auto' onPress={handleSubmit(onSubmit)} />
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