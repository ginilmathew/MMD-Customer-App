
import { Platform, StyleSheet, Text, View, AppState, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Navigation from './src/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage'
import { QueryClientProvider, QueryClient } from 'react-query'
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { focusManager } from '@tanstack/react-query';
import LocationContext from './src/context/location/locationContext'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native'

import CartProvider from './src/context/cart/cartContext'
import { useAppState } from './src/hooks/appStateManagement'
import SlotProvider from './src/context/slot/slotContext'



export const queryClient = new QueryClient();
export const storage = new MMKVLoader().initialize()

const App = () => {



  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected);
    });
  });

  async function requestUserPermission() {

    const token = await messaging().getToken();

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }
    else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Push Notification Permission",
          message:
            "App needs access to your notification permission to sent notifications ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location");
      } else {
        // console.log("Location permission denied");
      }
    }

    await notifee?.createChannel({
      id: 'sound',
      name: 'pressable channel',
      importance: AndroidImportance.HIGH,
      sound: 'custom'
    })
  }


  async function onMessageReceived(message) {

    // Display Notification
    await notifee.displayNotification({
      id: message?.messageId,
      title: message.notification.title,
      body: message.notification.body,
      data: message?.data,
      android: {
        channelId: 'sound',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: message?.messageId,
        },
        sound: 'sound',
      },
    });

  }

  // Subscribe to events
  useEffect(() => {

    return notifee.onForegroundEvent(({ type, detail }) => {

      // console.log(detail.notification.data);

      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          const { type } = detail?.notification?.data;
          if (type === 'product') {
            // navigation.navigate(HOME_NAVIGATOR, { screen: JOB_NAVIGATOR, params: { jobId: detail?.notification?.data?.Id } })
          }

          break;
      }
    });
  }, []);


  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(onMessageReceived);

    messaging().setBackgroundMessageHandler(onMessageReceived);

    return unsubscribe;
  }, [])







  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
        <LocationContext>
          <CartProvider>
            <SlotProvider>
              <Navigation />
            </SlotProvider>
          </CartProvider>
        </LocationContext>
      </SafeAreaView>
    </QueryClientProvider>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})