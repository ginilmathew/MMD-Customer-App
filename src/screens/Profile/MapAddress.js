import { View, TouchableOpacity, Image, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
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


const MapAddress = ({ navigation, route }) => {

    const mapRef = useRef(null);
    const [mode, setMode] = useState('map');
    const [item, setItem] = useState(0);

    const { location, setLocation, changeLocation } = useContext(locationContext)


    const schema = yup.object({
        name: yup.string().required("Name is required"),
        address: yup.string().required("Address is required"),
        mobile: yup.number().positive().required("Phone is required").typeError('Enter valid Phone number'),
        landmark: yup.string().required("Land mark is required")
    });


    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            name: 'asdfasdf',
            address: '2323232',
            mobile: '9283922323',
            landmark: ""
        }
    });

    const toLocation = useCallback(() => {
        navigation.navigate("GoogleLocation")
    }, [route?.params])


    useEffect(() => {
        mapRef.current?.animateToRegion({
            ...location?.location,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        })
    }, [])



    const changeMode = () => {
        setMode("address");
    }

    const checkBox = (num) => (
        <TouchableOpacity onPress={() => setItem(num)}>
            <IonIcon name={item === num ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
        </TouchableOpacity>
    )


    const onSubmit = useCallback(({ name, address, mobile, landmark }) => {

    }, [])


    return (
        <>
            <CommonHeader heading={'Add Address'} backBtn />

            <KeyboardAvoidingView style={[styles.container]} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>

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
                                        setLocation(location => {
                                            if (location.location.latitude !== e.nativeEvent.coordinate.latitude) {
                                                changeLocation(e.nativeEvent.coordinate)
                                            }
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

                            <CustomInput
                                control={control}
                                name={'name'}
                                left={'person'}
                                color={COLORS.blue}
                                placeholder='Name'
                            />

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


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginVertical: 4
                            }}>
                                <View style={{
                                    flexDirection: 'row'
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


                <CommonButton w='85%' onPress={mode === "map" ? changeMode : handleSubmit(onSubmit)} text={`CONFIRM ${mode === "map" ? "LOCATION" : ""}`} />

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