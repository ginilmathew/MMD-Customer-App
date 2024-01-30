import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import Category from '../screens/Category';


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
        <Stack.Screen name="Register" component={Login} />
        <Stack.Screen name="Forget" component={Login} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigation} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})