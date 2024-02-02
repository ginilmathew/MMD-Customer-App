import { StyleSheet, Text, View, Modal, useWindowDimensions, Image } from 'react-native'
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
import { FadeIn } from 'react-native-reanimated';
import Search from '../screens/search';
import SingleProduct from '../screens/AllProducts/SingleProduct';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../App';
import { useNetInfo } from '@react-native-community/netinfo';
import Toast from '../components/Toast';
import FeaturedProduct from '../screens/featuredProducts';
import Checkout from '../screens/checkout';
import LocationPage from '../screens/auth/LocationPage';
import { COLORS } from '../constants/COLORS';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/AddAddress';
import ChangePasswd from '../screens/Profile/ChangePasswd';
import GoogleLocation from '../screens/Profile/GoogleLocation';
import MapAddress from '../screens/Profile/MapAddress';


const Stack = createNativeStackNavigator();
const Navigation = () => {

  const { isConnected } = useNetInfo();
  const [user] = useMMKVStorage('user', storage);
  const [error] = useMMKVStorage('error', storage)
  const [success] = useMMKVStorage('success', storage);

  const { height, width } = useWindowDimensions()


  const onReady = useCallback(() => {
    SplashScreen.hide()
  }, [])


  return (
    <>
      <NavigationContainer ref={navigationRef} onReady={onReady}>
        <Stack.Navigator initialRouteName={user ? 'HomeNavigator' : 'Login'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Forget" component={Forget} />
          <Stack.Screen name="HomeNavigator" component={HomeNavigation} />
          <Stack.Screen name="SingleOrder" component={SingleOrder} />
          <Stack.Screen name="Notification" component={NotificationPage} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="AllProducts" component={AllProducts} />
          <Stack.Screen name="SingleCategory" component={SingleCategory} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="SingleProduct" component={SingleProduct} />
          <Stack.Screen name="FeaturedProduct" component={FeaturedProduct} />
          <Stack.Screen name='LocationPage' component={LocationPage} />            
          <Stack.Screen name='EditProfile' component={EditProfile} />
          <Stack.Screen name='Address' component={AddAddress} />
          <Stack.Screen name='ChangePasswd' component={ChangePasswd} />
          <Stack.Screen name='GoogleLocation' component={GoogleLocation} />
          <Stack.Screen name='MapPage' component={MapAddress} />
        </Stack.Navigator>
      </NavigationContainer>

      {
        isConnected !== null && !isConnected && (
          <Modal visible transparent>
            <View style={{ height, width, flex: 1, backgroundColor: COLORS.white }}>
              <Image
                style={{ height: 23, width: 45 }}
                source={require('../images/no-internet.png')}
              />
            </View>
          </Modal>

        )
      }

      <Modal visible={!!error || !!success} transparent>
        <View style={{ backgroundColor: 'rgba(0,0,0,.1)', flex: 1 }}>
          <Toast error={error} success={success} />
        </View>
      </Modal>
    </>
  )
}

export default Navigation

const styles = StyleSheet.create({})