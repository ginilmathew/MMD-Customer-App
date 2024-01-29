import { StyleSheet, Text, View } from 'react-native'
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index
=======
import React, { useState } from 'react'
=======
import React, { useCallback, useState } from 'react'
>>>>>>> nazim
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  const [initialScreen, setInitialScreen] = useState(null)

  const onReady = useCallback(() => {
    SplashScreen.hide()
  }, [])


  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator initialRouteName={initialScreen ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
>>>>>>> main

const styles = StyleSheet.create({})