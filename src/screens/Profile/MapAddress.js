import { View, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
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
import COLORS from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import { useMutation } from 'react-query'
import { addAddress } from '../../api/Profile'
import Header from '../../components/Header'


const MapAddress = ({ navigation, route }) => {

    const mapRef = useRef(null);
    const [mode, setMode] = useState('map');
    const [item, setItem] = useState(0);
    const [userLoc, setUserLoc] = useMMKVStorage('userLoc', storage);
    const [defaultVal, setDefaultVal] = useState(false)
    const [user] = useMMKVStorage('user', storage)

    const { location, setLocation, changeLocation, setMode: accessMode } = useContext(locationContext)


    const { mutate, isLoading } = useMutation({
        mutationKey: 'add-address',
        mutationFn: addAddress,
        onSuccess({ data }) {
            // if (data?.address) {
            //     if (!userLoc) {
            //         setUserLoc(true)
            //         navigation.reset({
            //             index: 0,
            //             routes: [
            //                 { name: 'HomeNavigator' }
            //             ]
            //         })
            //     }

            //     return;
            // }
            navigation.navigate(route?.params?.cartID ? 'EditAddress' : 'Address', route?.params?.cartID && { cartID: route?.params?.cartID })
        }
    })


    const schema = yup.object({
        pincode: yup.string().matches(/\d{6,}/, 'Please enter a valid value with at least 6 digits.').nullable(),
        address: yup.string().required("Address is required"),
        mobile: yup.number().positive().required("Phone is required").typeError('Enter valid Phone number'),
        landmark: yup.string().nullable(),
        comments: yup.string().nullable()
    });


    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            address: location?.address,
            mobile: user?.user?.mobile,
            landmark: ""
        }
    });

    const toLocation = useCallback(() => {
        accessMode('map')
        navigation.navigate("GoogleLocation", route?.params?.cartID && { cartID: route?.params?.cartID })
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
            <Header icon={true} />
            <CommonHeader heading={'Add Address'} backBtn />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1}}>
                <ScrollView contentContainerStyle={mode === 'map' && { flex: 1 }} style={styles.container}>

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
                                        color: COLORS.dark,
                                        fontFamily: 'Poppins-Bold',
                                        marginBottom: 2,
                                        letterSpacing: 0.5
                                    }}>DELIVERY LOCATION</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',

                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            width: "80%",
                                        }}>
                                            <EvilIcons name='location' size={23} color={COLORS.primary} />
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{
                                                    color: COLORS.light,
                                                    fontFamily: 'Poppins-SemiBold',

                                                }}>{location?.address > 25 ? location?.address?.slice(0, 25) + '...' : location?.address}</Text>

                                                <Text style={{
                                                    color: COLORS.dark,

                                                    fontSize: 11,
                                                    fontFamily: "Poppins-Regular"
                                                }}>{location?.address?.secondary}
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{
                                                flexDirection: 'row',
                                                backgroundColor: COLORS.gray,
                                                borderColor: COLORS.primary,
                                                borderWidth: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: 5,
                                                width: 60,
                                                padding: 5

                                            }} onPress={toLocation}>
                                                <Text style={{
                                                    color: COLORS.primary,
                                                    fontFamily: "Poppins-SemiBold",
                                                    fontSize: 10,
                                                    letterSpacing: 0.5
                                                }}>CHANGE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                </View>
                            </>
                        ) : (
                            <View style={{ padding: 20 }}>

                                <View style={{
                                    alignSelf: 'flex-end',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 27,
                                    marginBottom: 20,
                                }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
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
                                            color: COLORS.light,
                                            marginLeft: 5,
                                            fontFamily: "Poppins-Medium"
                                        }}>Home</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        {checkBox(1)}
                                        <Text style={{
                                            color: COLORS.light,
                                            marginLeft: 5,
                                            fontFamily: "Poppins-Medium"
                                        }}>Office</Text>
                                    </View>
                                </View>
                            </View>

                        )
                    }

                    <CommonButton
                        w='85%'
                        mt={mode === 'address' && 60}
                        onPress={(mode === "map" || route?.params?.mode === "map") ? changeMode : handleSubmit(onSubmit)}
                        text={`CONFIRM ${mode === "map" ? "LOCATION" : ""}`}
                        loading={isLoading}
                    />


                </ScrollView>
            </KeyboardAvoidingView>

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