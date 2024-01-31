import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Background from './Background';
import IonIcons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../components/CommonButton';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/COLORS';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { loginApi } from '../../api/auth';


const Login = ({ navigation }) => {


    const schema = yup.object({
        email: yup.string().email('Please enter valid email address').required('Email is required'),
        passwd: yup.string().required('Password is required')
    })

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    // const on

    const { mutate } = useMutation({
        mutationKey: ['login-query'],
        mutationFn: loginApi,
        onSuccess
    })

    const navToRegister = useCallback(() => {
        navigation.navigate('Register')
    }, [navigation])


    const navToForget = useCallback(() => {
        navigation.navigate('Forget')
    }, [navigation])


    const onSubmit = useCallback((data) => {
        console.log(data);
    }, [])

    return (
        <Background
            headline={'LOGIN'}
            subhead={'To your registered account'}
            onPress={navToRegister}
            link={'Register here'}
            description={"Don't have an account yet?"}
        >

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
                color={COLORS.blue}
                passwd
            />

            <TouchableOpacity onPress={navToForget} style={styles.linkBox}>
                <Text style={styles.link}>{'Forget Password?'}</Text>
            </TouchableOpacity>

            <CommonButton text={'Login'} onPress={handleSubmit(onSubmit)} />


        </Background>
    );

}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    linkBox: {
        width: '100%',
        marginBottom: 10
    },
    link: {
        color: COLORS.red,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'right',
        fontFamily: 'Poppins-bold'
    },
})