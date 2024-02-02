import { View, TouchableOpacity, Image, Text, StyleSheet, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '../../components/CommonButton'
import MapView, { Marker } from 'react-native-maps'
import locationContext from '../../context/location'
import IonIcon from 'react-native-vector-icons/Ionicons'
import CustomInput from '../../components/CustomInput'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import { useMutation, useQuery } from 'react-query'
import { addAddress } from '../../api/Profile'
import Header from '../../components/Header'


const MapAddress = ({ navigation, route }) => {

    const mapRef = useRef(null);
    const [mode, setMode] = useState('map');
    const [item, setItem] = useState(0);
    const [userLoc, setUserLoc] = useMMKVStorage('userLoc', storage);
    const [defaultVal, setDefaultVal] = useState(false)
    const [user] = useMMKVStorage('user', storage)

    const { location, setLocation, changeLocation } = useContext(locationContext)


    const { mutate } = useMutation({
        mutationKey: 'add-address',
        mutationFn: addAddress,
        onSuccess({ data }) {
            
            if(data?.data?.count > 0) {
                if (!userLoc) {
                    setUserLoc(true)
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'HomeNavigator' }
                        ]
                    })
                }

                return;
            }
            navigation.navigate('Address')
        }
    })


    const schema = yup.object({
        pincode: yup.string().matches(/\d{6,}/, 'Please enter a valid value with at least 6 digits.').required('Pincode required'),
        address: yup.string().required("Address is required"),
        mobile: yup.number().positive().required("Phone is required").typeError('Enter valid Phone number'),
        landmark: yup.string().required("Land mark is required"),
        comments: yup.string().nullable()
    });


    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            address: location?.address?.secondary,
            mobile: user?.user?.mobile,
            landmark: ""
        }
    });

    const toLocation = useCallback(() => {
        navigation.navigate("GoogleLocation", route?.params?.mode && { mode: true })
    }, [route?.params])


    useEffect(() => {
        mapRef.current?.animateToRegion({
            ...location?.location,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        })
    }, [])



    const changeMode = useCallback(() => {
        setMode("address");
    }, [])

    const handleToggle = useCallback(() => {
        setDefaultVal(!defaultVal)
    }, [defaultVal])

    const checkBox = (num) => (
        <TouchableOpacity onPress={() => setItem(num)}>
            <IonIcon name={item === num ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
        </TouchableOpacity>
    )


    const onSubmit = useCallback(({ comments, address, mobile, landmark, pincode }) => {
        mutate({
            comments, mobile, pincode,
            default: defaultVal,
            "address_type": item ? "office" : "home",
            "area": {
                address,
                "latitude": location?.location?.latitude,
                "longitude": location?.location?.longitude,
                "location": landmark
            }
        })
    }, [location, defaultVal, item])


    return (
        <>
            {
                !route?.params?.mode && (
                    <>
                        <Header />
                        <CommonHeader heading={'Add Address'} backBtn />
                    </>
                )
            }

            <ScrollView contentContainerStyle={mode === 'map' && { flex: 1 }} style={styles.container} keyboardShouldPersistTaps='always'>

                {
                    mode === "map" ? (
                        <>
                            <MapView
                                style={{
                                    flex: 1
                                }}
                                ref={mapRef}
                                onPress={(e) => {
                                    if (location)
                                        setLocation((location) => {
                                            if (location.location.latitude !== e.nativeEvent.coordinate.latitude) {
                                                changeLocation(e.nativeEvent.coordinate)
                                            }

                                            return { ...location, location: { ...e.nativeEvent.coordinate } }
                                        })
                                mapRef.current.animateToRegion({
                                        ...e.nativeEvent.coordinate,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.02
                                    })
                                }}
                                showsUserLocation
                                showsMyLocationButton
                                followsUserLocation
                                showsCompass
                                scrollEnabled
                                zoomEnabled
                                pitchEnabled
                                rotateEnabled
                                moveOnMarkerPress
                                initialRegion={{
                                    ...location?.location,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                            >
                                <Marker
                                    title='Yor are here'
                                    description='This is a description'
                                    coordinate={{
                                        ...location?.location,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }} />
                            </MapView>


                            <View style={{ padding: 13, backgroundColor: COLORS.white, marginTop: "auto" }}>
                                <Text style={{
                                    color: COLORS.light,
                                    fontFamily: 'Poppins-Bold',
                                    marginBottom: 2
                                }}>SELECT DELIVERY LOCATION</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <EvilIcons name='location' size={23} color={COLORS.primary} />
                                        <Text style={{
                                            color: COLORS.light,
                                            fontFamily: 'Poppins-Bold',
                                            marginBottom: 2,
                                            marginLeft: 20
                                        }}>{location?.address?.main}</Text>
                                    </View>

                                    <TouchableOpacity style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        backgroundColor: COLORS.gray,
                                        borderColor: COLORS.primary,
                                        borderWidth: 1,
                                        padding: 4,
                                        borderRadius: 10,
                                        alignItems: 'center'
                                    }} onPress={toLocation}>
                                        <Text style={{
                                            color: COLORS.primary,
                                            fontWeight: '600',
                                            fontSize: 10
                                        }}>CHANGE</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{
                                    color: COLORS.dark,
                                    width: '80%'
                                }}>{location?.address?.secondary}
                                </Text>

                            </View>
                        </>
                    ) : (
                        <View style={{ padding: 20 }}>

                                {
                                    route?.params?.mode && (
                                        <View style={{
                                            height: 193,
                                            width: '100%',
                                            marginTop: -50
                                        }}>
                                            <Image source={require('../../images/DG.png')} style={{
                                                height: '100%',
                                                width: '100%',
                                            }} />
                                        </View>
                                    )
                                }

                                <View style={{
                                    alignSelf: 'flex-end',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 27,
                                    marginBottom: 20,
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Light',
                                        fontSize: 11,
                                        color: COLORS.light,
                                        marginRight: 10
                                    }}>DEFAULT</Text>
                                    <TouchableOpacity activeOpacity={.8} onPress={handleToggle} style={{
                                        width: 45, height: '100%', backgroundColor: defaultVal ? COLORS.primary : COLORS.text, borderRadius: 50,
                                        justifyContent: 'center',
                                        paddingHorizontal: 5
                                    }}>
                                        <View style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 30,
                                            marginVertical: -2.5,
                                            backgroundColor: COLORS.white,
                                            ...(defaultVal ? { marginLeft: 'auto' } : { marginRight: 'auto' })
                                        }} />
                                    </TouchableOpacity>
                                </View>

                                <CustomInput
                                    control={control}
                                    name={'address'}
                                    left={'location'}
                                    color={COLORS.blue}
                                    placeholder='Address'
                                />

                                <CustomInput
                                    control={control}
                                    name={'mobile'}
                                    type={"number-pad"}
                                    left={'call'}
                                    color={COLORS.blue}
                                    placeholder='Phone'
                                />

                                <CustomInput
                                    control={control}
                                    name={'landmark'}
                                    autoFocus
                                    color={COLORS.blue}
                                    placeholder='Landmark'
                                    left={'map'}
                                />

                                <CustomInput
                                    control={control}
                                    name={'pincode'}
                                    color={COLORS.blue}
                                    placeholder='Pincode'
                                    left={'pin'}
                                    type={'number-pad'}
                                />

                                <CustomInput
                                    control={control}
                                    name={'comments'}
                                    multi
                                    placeholder='Comments'
                                />

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginVertical: 4
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        {checkBox(0)}
                                        <Text style={{
                                            color: COLORS.light
                                        }}>Home</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        {checkBox(1)}
                                        <Text style={{
                                            color: COLORS.light
                                        }}>Office</Text>
                                    </View>
                                </View>
                        </View>

                    )
                }

                <CommonButton w='85%' mt={mode === 'address' && 60} onPress={mode === "map" ? changeMode : handleSubmit(onSubmit)} text={`CONFIRM ${mode === "map" ? "LOCATION" : ""}`} />


            </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingBottom: 10
    },
})

export default MapAddress