import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext } from 'react'
import Background from './Background';
import IonIcons from 'react-native-vector-icons/Ionicons'
import CommonButton from '../../components/CommonButton';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/COLORS';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { loginApi, tokenApi } from '../../api/auth';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../../App';
import { CommonActions } from '@react-navigation/native';
import locationContext from '../../context/location';
import messaging from '@react-native-firebase/messaging';
import customAxios from '../../customAxios';
import { PERMISSIONS, check, RESULTS } from 'react-native-permissions'


const Login = ({ navigation }) => {

    const { getLocation, setMode } = useContext(locationContext)
    const { mutate: tokenMutate } = useMutation({
        mutationKey: 'token-key',
        mutationFn: tokenApi
    })


    const schema = yup.object({
        email: yup.string().email('Please enter valid email address').required('Email is required'),
        password: yup.string().required('Password is required')
    })

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const onSuccess = async ({ data }) => {
        await storage.setMapAsync('user', data);
        const token = await messaging().getToken();
        tokenMutate(token)
        storage.setString('success', 'Login successful')

        // try {

        //     const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        //     if (result === RESULTS.GRANTED) {
        //         setMode('home');
        //         getLocation();
        //     } else {
        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'LocationPage' }]
        //         });
        //     }

        //     storage.setString('success', 'Login successful')
        // } catch (err) {
        //     // console.warn(err);
        // }
        // navigation.navigate(data?.defaultAddress ? 'HomeNavigator' : 'LocationPage');
    }

    const { mutate, isLoading } = useMutation({
        mutationKey: 'login-query',
        mutationFn: loginApi,
        onSuccess
    })


    const navToRegister = useCallback(() => {
        navigation.navigate('Register')
    }, [navigation])


    const navToForget = useCallback(() => {
        navigation.navigate('Forget')
    }, [navigation])


    return (
        <Background
            headline={'LOGIN'}
            subhead={'To your registered account'}
            onPress={navToRegister}
            link={'Register Here'}
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
                name={'password'}
                placeholder='Password'
                left={'lock-closed'}
                color={COLORS.blue}
                passwd
            />

            <TouchableOpacity onPress={navToForget} style={styles.linkBox}>
                <Text style={styles.link}>{'Forget Password?'}</Text>
            </TouchableOpacity>

            <CommonButton text={'Login'} onPress={handleSubmit(mutate)} loading={isLoading}/>


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
        textAlign: 'right',
        fontFamily: 'Poppins-Medium'
    },
})