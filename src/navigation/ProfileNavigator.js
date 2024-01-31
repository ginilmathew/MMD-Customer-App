import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/AddAddress';
import ChangePasswd from '../screens/Profile/ChangePasswd';
import GoogleLocation from '../screens/Profile/GoogleLocation';
import MapAddress from '../screens/Profile/MapAddress';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='Address' component={AddAddress} />
            <Stack.Screen name='ChangePasswd' component={ChangePasswd} />
            <Stack.Screen name='GoogleLocation' component={GoogleLocation} />
            <Stack.Screen name='MapPage' component={MapAddress} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator