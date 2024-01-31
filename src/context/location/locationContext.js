import { Alert, PermissionsAndroid } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { getLocation as locationApi } from '../../api/Profile';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Context from '.'
import { navigationRef } from '../../navigation/RootNavigation';



const locationContext = ({ children }) => {

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

        navigationRef.navigate('MapPage');
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
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    subscribeLocationLocation();
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
                const { latitude, longitude } = position.coords

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
        <Context.Provider
            value={{
                location,
                setLocation,
                getLocation: requestLocationPermisson,
                changeLocation: mutate
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default locationContext