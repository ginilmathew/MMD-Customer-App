
import { Platform, StyleSheet, Text, View, AppState } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MMKVLoader } from 'react-native-mmkv-storage'
import { QueryClientProvider, QueryClient } from 'react-query'
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { focusManager } from '@tanstack/react-query';
import LocationContext from './src/context/location/locationContext'



export const queryClient = new QueryClient();
export const storage = new MMKVLoader().initialize()

const App = () => {


  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected);
    });
  });

  // function onAppStateChange(status) {
  //   if (Platform.OS !== 'web') {
  //     focusManager.setFocused(status === 'active');
  //   }
  // }

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', onAppStateChange);

  //   return () => subscription.remove();
  // }, []);



  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
        <LocationContext>
          <Navigation />
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