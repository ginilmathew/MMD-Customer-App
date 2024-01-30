import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import Background from './Background'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput'
import { COLORS } from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'


const Register = ({ navigation }) => {


    const schema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Please enter valid email address').required('Email is required'),
        passwd: yup.string().required('Password is required'),
        phone: yup.string().required('Contact number required')
    })

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })


    const navToLogin = useCallback(() => {
        navigation.navigate('Login')
    }, [navigation])

    return (
        <Background
            headline={'REGISTER'}
            subhead={'To your registered account'}
            onPress={navToLogin}
            link={'Already have an account?'}
            description={"Don't have an account yet?"}
        >
            <CustomInput
                control={control}
                name={'name'}
                placeholder='Name'
                left={'person'}
                color={COLORS.blue}
            />
            <CustomInput
                control={control}
                name={'email'}
                placeholder='Email Address'
                left={'mail'}
                color={COLORS.blue}
                type={'email-address'}
            />
            <CustomInput
                control={control}
                name={'passwd'}
                placeholder='Password'
                left={'lock-closed'}
                passwd
                color={COLORS.blue}
            />
            <CustomInput
                control={control}
                name={'phone'}
                placeholder='Contact Number'
                left={'call'}
                color={COLORS.blue}
                type='number-pad'
            />

            <CommonButton text={'Register'} mt={23} />

        </Background>
    )
}

export default Register