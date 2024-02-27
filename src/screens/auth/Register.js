import React, { useCallback } from 'react'
import Background from './Background'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput'
import COLORS from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import { useMutation } from 'react-query'
import { registerApi } from '../../api/auth'
import { storage } from '../../../App'


const Register = ({ navigation }) => {


    const schema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Please enter valid email address').required('Email is required'),
        password: yup.string().required('Password is required'),
        mobile: yup.string().required('Contact number required')
    })

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const onSuccess = ({ data }) => {
        storage.setString('success', data?.message)
        navigation.navigate('Login')
    }

    const { mutate, isLoading } = useMutation({
        mutationKey: ['register-query'],
        mutationFn: registerApi,
        onSuccess
    })

    const goBack = useCallback(() => {
        navigation?.goBack()
    }, [navigation]);


    return (
        <Background
            headline={'REGISTER'}
            subhead={'Join the DGCart family'}
            onPress={goBack}
            link={'Go to Login'}
            description={"Already have an account?"}
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
                name={'password'}
                placeholder='Password'
                left={'lock-closed'}
                passwd
                color={COLORS.blue}
            />
            <CustomInput
                control={control}
                name={'mobile'}
                placeholder='Contact Number'
                left={'call'}
                color={COLORS.blue}
                type='number-pad'
            />

            <CommonButton text={'Register'} mt={23} onPress={handleSubmit(mutate)} loading={isLoading}/>

        </Background>
    )
}

export default Register