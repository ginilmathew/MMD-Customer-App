import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  const [initialScreen, setInitialScreen] = useState(null)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})