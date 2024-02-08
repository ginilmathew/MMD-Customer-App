import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import locationContext from '../../context/location'
import { navigate } from '../../navigation/RootNavigation'
import { PERMISSIONS, request } from 'react-native-permissions'
import { storage } from '../../../App'
import reactotron from 'reactotron-react-native'

const LocationPage = ({ navigation }) => {

    const { location, getLocation, setMode } = useContext(locationContext)

    useEffect(() => {
        setMode('home');
    }, [])

    const onPress = useCallback(() => {
        navigation.navigate('GoogleLocation')
    }, [])


    const getLocationPermission = async() => {
        reactotron.log("in")
        let permissions;
        if(Platform.OS === 'android'){
            permissions = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            if(permissions === "granted"){
                getLocation()
            }
            else{
                reactotron.log({permissions})
                if(permissions === "blocked"){
                    Linking.openSettings()
                }
                storage.setString("error", `Location Permission ${permissions} by the user`)
            }
        }
        else{
            permissions = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if(permissions === "granted"){
                getLocation()
            }
            else{
                reactotron.log({permissions})
                storage.setString("error", `Location Permission ${permissions} by the user`)
            }
        }

        
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.main_heading}>What's your location?</Text>
                <Text style={styles.description}>We need your location to show available products</Text>
            </View>

            <Image source={require('../../images/building.png')} style={styles.img} />

            <View style={styles.header}>
                <CommonButton text={'Allow location access'} onPress={getLocationPermission} />

                <TouchableOpacity 
                style={{
                    marginTop: 23,
                }}
                onPress={onPress}>
                    <Text style={{
                        color: COLORS.primary,
                        textAlign: 'center',
                        fontSize: 20
                    }}>Enter Location Manually</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
    },
    header: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
    },
    img: {
        height: '60%',
        width: '100%'
    },
    main_heading: {
        fontFamily: 'Poppins-Bold',
        color: COLORS.dark,
        fontSize: 23
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: COLORS.light
    }
})

export default LocationPage