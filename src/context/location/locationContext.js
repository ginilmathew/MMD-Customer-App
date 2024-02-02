import { Alert, PermissionsAndroid } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { getLocation as locationApi } from '../../api/Profile';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import LocationContext from './index'
import { navigationRef } from '../../navigation/RootNavigation';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../../App';




const locationContext = ({ children }) => {

    const [userLoc] = useMMKVStorage('userLoc', storage)

    const [location, setLocation] = useState({
        location: {
            latitude: -19.502842,
            longitude: 20.294303
        }
    })

    
    const onSuccess = ({ data }) => {

        setLocation(location => ({
            ...location,
            address: {
                main: data?.results[3]?.address_components[0]?.short_name,
                secondary: data?.results[3]?.formatted_address
            },
        }));

        navigationRef.navigate('MapPage', !userLoc && { mode: true })
        // navigationRef.navigate('HomeNavigator', { screen: 'Home' })
    }


    const { mutate } = useMutation({
        mutationFn: locationApi,
        onSuccess
        // onError // need to hide error
    });


    const requestLocationPermisson = async () => {

        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                        buttonPositive: 'Allow'
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    subscribeLocationLocation();
                } else {
                    navigationRef.navigate('HomeNavigator', { screen: 'ProfileNavigator', params: { screen: 'GoogleLocation', params: { mode: 'no_place' } } })
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {

                const { latitude, longitude } = position.coords;

                setLocation({
                    location: { latitude, longitude }
                })

                mutate(position.coords)
            },
            (error) => {
                if (error?.message === "No location provider available.") {
                    LocationServicesDialogBox.checkLocationServicesIsEnabled({
                        message: "GPS is disabled in your device. Would you like to enable it?",
                        ok: "enable",
                        cancel: "cancel"
                    }).then(() => {
                        // console.log('hslkdfj');
                        // Perform your location-related task
                    });
                }
            },
            {
                enableHighAccuracy: false,
            },
        );
    };


    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {

                const { latitude, longitude } = position.coords

                setLocation({
                    location: { latitude, longitude }
                })
            },
            (error) => {
                if (error?.message === "No location provider available.") {
                    // Alert.alert(t('location_msg'))
                }
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                getLocation: requestLocationPermisson,
                changeLocation: mutate
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export default locationContext