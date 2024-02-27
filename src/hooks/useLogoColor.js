import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import customAxios from '../customAxios'
import reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../constants/COLORS'

const useLogoColor = () => {

    const [logoColor, setLogoColor] = useState(null)
    useEffect(async () => {
        
        return logoColor;

    }, [])

}

export default useLogoColor

const styles = StyleSheet.create({})