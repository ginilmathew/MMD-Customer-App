import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import Register from '../screens/auth/Register';
import Forget from '../screens/auth/Forget';
import Category from '../screens/Category';
import AllProducts from '../screens/AllProducts';
import SingleCategory from '../screens/Category/singleCategory';
import SingleOrder from '../screens/orders/SingleOrder';

import NotificationPage from '../screens/notification';
import Cart from '../screens/cart';


const Stack = createNativeStackNavigator();
const Navigation = () => {

  const [initialScreen, setInitialScreen] = useState("null")

  const onReady = useCallback(() => {
    SplashScreen.hide()
  }, [])


  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator initialRouteName={initialScreen ?  'HomeNavigator' : 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigation} />
        <Stack.Screen name="SingleOrder" component={SingleOrder} />
        <Stack.Screen name="Notification" component={NotificationPage} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})