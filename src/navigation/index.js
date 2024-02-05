import { StyleSheet, Text, View, Modal, useWindowDimensions, Image, AppState, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, NavigationState, useRoute } from '@react-navigation/native';
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
import LocationContext from '../context/location';
import Entypo from 'react-native-vector-icons/Entypo'
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';


const Stack = createNativeStackNavigator();
const Navigation = () => {

  const { isConnected } = useNetInfo();
  const [user] = useMMKVStorage('user', storage);
  const [error] = useMMKVStorage('error', storage)
  const [success] = useMMKVStorage('success', storage);
  const [homeAdd] = useMMKVStorage('homeAdd', storage, false)
  const { setMode, getLocation, setModal, modal, handleModal, openSettings, setReady, mode } = useContext(LocationContext)


  const { height, width } = useWindowDimensions()

  const onReady = useCallback(() => {
    SplashScreen.hide()
  }, [])

  const modalVisible = useCallback(async () => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    if (result === RESULTS.DENIED) {
      navigationRef.navigate('GoogleLocation')
      
      setModal(false);
    }
  }, [modal])

  async function onAppStateChange(status) {

    const user = await storage.getMapAsync('user');
    if (status === 'active' && user) {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      if (result === RESULTS.DENIED) {
        return setModal(true);
      } else if (result === RESULTS.GRANTED) {
        setModal(false);
      
        setMode('home')
        getLocation()
      }

    }
  }


  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);


  return (
    <>
      <NavigationContainer ref={navigationRef} onReady={onReady}>
        <Stack.Navigator
          initialRouteName={user && homeAdd ? 'HomeNavigator' : user ? 'LocationPage' : 'Login'}
          screenOptions={{ headerShown: false }}>
          {/* <Stack.Navigator initialRouteName={ 'HomeNavigator' } screenOptions={{ headerShown: false }}> */}
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
            <View style={{ height, width, flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ height: 293, width: 250, resizeMode: 'contain' }}
                source={require('../images/no_internet.jpg')}
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

      <Modal visible={modal} transparent>
        <View style={styles.modal}>
          <View style={styles.box}>
            <View style={styles.box__header}>
              <Text style={styles.header__main}>Turn On Location permission</Text>
              <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={modalVisible}>
                <Entypo name='circle-with-cross' size={23} color={COLORS.light} />
              </TouchableOpacity>
            </View>
            <Text style={styles.box__description}>Please go to Settings - Location to turn on Location permission</Text>

            <View style={styles.box__container}>
              <TouchableOpacity style={[styles.box__btn, { backgroundColor: COLORS.primary_light }]} onPress={modalVisible}>
                <Text style={[styles.btn__text, { color: COLORS.primary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.box__btn, { backgroundColor: COLORS.primary }]} onPress={openSettings}>
                <Text style={[styles.btn__text, { color: COLORS.white }]}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Navigation

const styles = StyleSheet.create({
  modal: { backgroundColor: 'rgba(0,0,0,.5)', flex: 1, justifyContent: 'center', alignItems: 'center' },
  box: {
    backgroundColor: COLORS.white,
    width: '80%',
    padding: 20,
    borderRadius: 10
  },
  box__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  box__btn: {
    width: '45%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  box__header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  header__main: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.dark,
    width: '60%'
  },
  box__description: {
    color: COLORS.light,
    fontFamily: 'Poppins-Medium',
    marginVertical: 3
  },
  btn__text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  }
})