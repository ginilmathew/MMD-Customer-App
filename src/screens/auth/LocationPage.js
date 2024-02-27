import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Linking, Modal } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import COLORS from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import locationContext from '../../context/location'
import { PERMISSIONS, request } from 'react-native-permissions'
import { storage } from '../../../App'
import Entypo from 'react-native-vector-icons/Entypo'


const LocationPage = ({ navigation }) => {

    const { location, getLocation, setMode } = useContext(locationContext)
    const [modal, setModal] = useState(false)


    useEffect(() => {
        setMode('home');
    }, [])

    const onPress = useCallback(() => {
        navigation.navigate('GoogleLocation', { mode: 'home' })
    }, [])


    const openSettings = () => {
        Linking.openSettings()
    }

    const modalVisible = () => {
        setModal(prev => !prev)
    }


    const getLocationPermission = async() => {
        let permissions;
        if(Platform.OS === 'android'){
            permissions = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            if(permissions === "granted"){
                getLocation()
                navigation.navigate('HomeNavigator')
            }
            else{
                if(permissions === "blocked"){
                    setModal(true)
                }
                //storage.setString("error", `Location Permission ${permissions} by the user`)
            }
        }
        else{
            permissions = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if(permissions === "granted"){
                getLocation()
                navigation.navigate('HomeNavigator')
            }
            else{
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
    },
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

export default LocationPage