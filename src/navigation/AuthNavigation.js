import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './HomeNavigation';
import SingleOrder from '../screens/orders/SingleOrder';
import NotificationPage from '../screens/notification';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={"home"}
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={HomeNavigation} />
                <Stack.Screen name="SingleOrder" component={SingleOrder} />
                <Stack.Screen name="Notification" component={NotificationPage} />
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})