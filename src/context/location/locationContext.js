import { Alert, Linking, PermissionsAndroid } from 'react-native'
import { useCallback, useContext, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { useMutation } from 'react-query';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getLocation as locationApi } from '../../api/Profile';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import LocationContext from './index'
import { navigationRef } from '../../navigation/RootNavigation';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../../App';
import { PERMISSIONS, check, RESULTS } from 'react-native-permissions'




const locationContext = ({ children }) => {


    const [location, setLocation] = useState({})
    const [mode, setMode] = useState('')
    const [currentLoc, setCurrentLoc] = useState('')
    const [homeAdd, setHomeAdd] = useMMKVStorage('homeAdd', storage);
    const [modal, setModal] = useState(false)
    const [homeFocus, setHomeFocus] = useState(false)

    
    const onSuccess = async ({ data }) => {

        console.log(mode);
        if(mode === 'map') {
            setLocation(location => ({
                ...location,
                address: {
                    main: data?.results[3]?.address_components[0]?.short_name,
                    secondary: data?.results[3]?.formatted_address
                },
            }));

            navigationRef.navigate('MapPage')
        } else if (mode === 'home') {
            if(!homeAdd) {
                setHomeAdd(true);
            }

            setCurrentLoc({
                coord: { ...location?.location },
                address: data?.results[3]?.formatted_address
            })

            navigationRef.reset({
                index: 0,
                routes: [
                    { name: 'HomeNavigator' }
                ]
            })
        } 
        // navigationRef.navigate('HomeNavigator', { screen: 'Home' })
    }

    const handleModal = useCallback(async () => {
        try {
            const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (result === RESULTS.GRANTED) {
                setModal(false);
                requestLocationPermisson();
            } else if (result === RESULTS.DENIED) {
                setModal(true);
            }
        } catch (err) {
            console.warn(err);
        }
    }, [])

    const openSettings = useCallback(() => {
        Linking.openSettings()
        setModal(true);
    }, [])

    const { mutate } = useMutation({
        mutationFn: locationApi,
        onSuccess
        // onError // need to hide error
    });


    const requestLocationPermisson = async () => {


            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    subscribeLocationLocation();
                } else {
                    // setmo
                }
            } catch (err) {
                console.warn(err);
            }
    }

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {

                const { latitude, longitude } = position.coords;

                setLocation(({address}) => ({
                    location: { latitude, longitude },
                    address
                }))

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

                setLocation(({ address }) => ({
                    location: { latitude, longitude },
                    address
                }))
            },
            (error) => {
                if (error?.message === "No location provider available.") {
                    // Alert.alert(t('location_msg'))
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 1000
            },
        );
    };

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                currentLoc,
                setCurrentLoc,
                mode, 
                setMode,
                modal,
                handleModal,
                getLocation: requestLocationPermisson,
                changeLocation: mutate,
                openSettings,
                setModal,
                homeFocus,
                setHomeFocus
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export default locationContext