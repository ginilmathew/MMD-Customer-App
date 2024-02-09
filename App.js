
import { Platform, StyleSheet, Text, View, AppState, PermissionsAndroid, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Navigation from './src/navigation'
//import { SafeAreaView } from 'react-native-safe-area-context'
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
import { PERMISSIONS, request, requestMultiple } from 'react-native-permissions'
import reactotron from 'reactotron-react-native'



export const queryClient = new QueryClient();
export const storage = new MMKVLoader().initialize()

const App = () => {

	const [locationPermission, setLocationPermission] = useState(false)
	const [loading, setLoading] = useState(true)



	onlineManager.setEventListener(setOnline => {
		return NetInfo.addEventListener(state => {
			setOnline(!!state.isConnected);
		});
	});

	async function requestUserPermission() {

        



        if (Platform.OS === 'android') {
            let permissions = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
			if(permissions?.['android.permission.POST_NOTIFICATIONS'] === "granted"){
				await notifee?.createChannel({
					id: 'sound',
					name: 'pressable channel',
					importance: AndroidImportance.HIGH,
					sound: 'custom'
				})
			}

			if(permissions?.['android.permission.ACCESS_FINE_LOCATION'] === "granted"){
				setLocationPermission(true)
				setLoading(false)
			}
			else{
				setLoading(false)
			}

            // const status = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);
            
        }
        else{
            let location = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

			if(location === "granted"){
				setLocationPermission(true)
				setLoading(false)
			}
			else{
				setLoading(false)
			}

            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
            if (enabled) {
				await notifee?.createChannel({
					id: 'sound',
					name: 'pressable channel',
					importance: AndroidImportance.HIGH,
					sound: 'custom'
				})
            }
            //const status = await Geolocation.requestAuthorization('whenInUse');
        }
       
        //getCurrentLocation()
    }

	// async function requestUserPermission() {

	// 	const token = await messaging().getToken();

	// 	if (Platform.OS === 'ios') {
	// 		const authStatus = await messaging().requestPermission();
	// 		const enabled =
	// 			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
	// 			authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	// 	}
	// 	else {
	// 		const granted = await PermissionsAndroid.request(
	// 			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
	// 			{
	// 				title: "Push Notification Permission",
	// 				message:
	// 					"App needs access to your notification permission to sent notifications ",
	// 				buttonNeutral: "Ask Me Later",
	// 				buttonNegative: "Cancel",
	// 				buttonPositive: "OK"
	// 			}
	// 		);
	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 			// console.log("You can use the location");
	// 		} else {
	// 			// console.log("Location permission denied");
	// 		}
	// 	}

		
	// }


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


	if(loading){
		return(
			<View />
		)
	}




	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={styles.safeArea}>
				<LocationContext>
					<CartProvider>
						<SlotProvider>
							<Navigation location={locationPermission} />
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