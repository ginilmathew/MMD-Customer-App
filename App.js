
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
import { PERMISSIONS, check, request, requestMultiple } from 'react-native-permissions'
import reactotron from 'reactotron-react-native'
import NotificationContext from './src/context/notification/notificationCount'
import { navigationRef } from './src/navigation/RootNavigation'
import useRefetch from './src/hooks/useRefetch'
import customAxios from './src/customAxios'
import { COLORS } from './src/constants/COLORS'



export const queryClient = new QueryClient();
export const storage = new MMKVLoader().initialize()

const App = () => {



	const [locationPermission, setLocationPermission] = useState(false)
	const [loading, setLoading] = useState(true)
	const [logo] = useMMKVStorage('dynamicLogo', storage)

	reactotron.log(logo,"Fdsafsdf")

	const getLogo = async () => {

		try {
			const res = await customAxios.get('public/api/auth/logo')
			if (res?.data?.message === "Success") {
				await storage.setMapAsync('dynamicLogo', res?.data)
			} else {
				throw "Internal server error"
			}
		} catch (error) {
			storage.setString("error", `${error}`)
		}
	}

	useEffect(() => {
		if (!logo) {
			getLogo()
		}
	}, [logo])




	onlineManager.setEventListener(setOnline => {
		return NetInfo.addEventListener(state => {
			setOnline(!!state.isConnected);
		});
	});



	async function requestUserPermission() {

		if (Platform.OS === 'android') {
			let permissions = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
			const location = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
	
			// if (permissions?.['android.permission.POST_NOTIFICATIONS'] === "granted") {
			await notifee?.createChannel({
				id: 'default',
				name: 'Default Channel',
				importance: AndroidImportance.HIGH,
				sound: 'sound'
			})
			// }

			if (location === "granted") {
				setLocationPermission(true)
				setLoading(false)
			}
			else {
				setLoading(false)
			}

			// const status = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);

		}
		else {

			const authStatus = await messaging().requestPermission();
			const enabled =
				authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
				authStatus === messaging.AuthorizationStatus.PROVISIONAL;

			if (enabled) {
				await notifee?.createChannel({
					id: 'default',
					name: 'Default Channel',
					importance: AndroidImportance.HIGH,
					sound: 'sound'
				})
			}
			
			let location = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

			if (location === "granted") {
				setLocationPermission(true)
				setLoading(false)
			}
			else {
				setLoading(false)
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
				channelId: 'default',
				importance: AndroidImportance.HIGH,
				pressAction: {
					id: message?.messageId,
				},
				sound: 'sound',
			},
			ios: {
				channelId: 'default',
				sound: 'sound'
			}
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
					const data = detail?.notification?.data;

					if (data?.order_id) {
						navigationRef.navigate('SingleOrder', { id: data?.order_id })
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


	if (loading) {
		return (
			<View />
		)
	}



	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={styles.safeArea}>
				<LocationContext>
					<NotificationContext>
						<CartProvider>
							<SlotProvider>
								<Navigation location={locationPermission} />
							</SlotProvider>
						</CartProvider>
					</NotificationContext>
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