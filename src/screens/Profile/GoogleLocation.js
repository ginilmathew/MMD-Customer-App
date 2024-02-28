import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Platform } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import COLORS from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import locationContext from '../../context/location/index'
import { GOOGLE_API } from '../../constants/API'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import { navigationRef } from '../../navigation/RootNavigation'
import { PERMISSIONS, request } from 'react-native-permissions'
import Entypo from 'react-native-vector-icons/Entypo'



const GoogleLocation = ({ navigation, route }) => {

	const styles = makeStyle(COLORS)

	const { setLocation, getLocation, mode, setCurrentLoc, setModal, setMode, handleModal } = useContext(locationContext)
	const [homeAdd, setHomeAdd] = useMMKVStorage('homeAdd', storage);
	const [modal, setModals] = useState(false)


	const modalVisible = () => {
        setModals(prev => !prev)
    }


	const addLoc = (_, data) => {

		if(route?.params?.mode === "header"){
			setLocation({
				location: {
					latitude: data?.geometry?.location?.lat,
					longitude: data?.geometry?.location?.lng,
				},
				address: data?.formatted_address
			})
			navigation.goBack()
		}
		else if (mode === 'home') {
			if (!homeAdd) {
				setHomeAdd(true);
			}
			setLocation({
				location: {
					latitude: data?.geometry?.location?.lat,
					longitude: data?.geometry?.location?.lng,
				},
				address: data?.formatted_address
			})
			setCurrentLoc({
				coord: {
					latitude: data?.geometry?.location?.lat,
					longitude: data?.geometry?.location?.lng,
				},
				address: data?.formatted_address
			})
			navigationRef.navigate('HomeNavigator');

		} else if (mode === 'map') {
			setLocation({
				location: {
					latitude: data?.geometry?.location?.lat,
					longitude: data?.geometry?.location?.lng,
				},
				address: data?.formatted_address
			})


			navigationRef.navigate('MapPage', route?.params?.cartID && { cartID: route?.params?.cartID })

		}
	}

	const currentLocation = useCallback(() => {
		if (route?.params?.cartID) {
			setMode('edit')
		}
		handleModal()
	}, [route?.params?.cartID])

	const getLocationPermission = async() => {
        let permissions;
        if(Platform.OS === 'android'){
            permissions = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            if(permissions === "granted"){
                getLocation()
				if (route?.params?.mode === 'home') {
					navigation.navigate('HomeNavigator')
				}
				else if(route?.params?.mode === "header" || mode === 'home'){
					navigation.goBack()
				}
				else if(mode === "map" || route?.params?.mode === "map"){
		
					navigationRef.navigate('MapPage', route?.params?.cartID && { cartID: route?.params?.cartID })
				} 
            }
            else{
                if(permissions === "blocked"){
                    setModals(true)
                }
                //storage.setString("error", `Location Permission ${permissions} by the user`)
            }
        }
        else{
            permissions = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if(permissions === "granted"){
                getLocation()
				if(route?.params?.mode === "header"){
					navigation.goBack()
				}
				else if(mode === "map" || route?.params?.mode === "map"){
					navigationRef.navigate('MapPage', route?.params?.cartID && { cartID: route?.params?.cartID })
				}
            }
            else{
                storage.setString("error", `Location Permission ${permissions} by the user`)
            }
        }

        
    }

	const renderRow = (data) => (
		<View style={{ pointerEvents: 'none', flexDirection: 'row', alignItems: 'center' }}>
			<MaterialCommunityIcons name='navigation-variant' size={23} color={COLORS.primary} />

			<TouchableOpacity style={{ marginLeft: 6 }}>
				<Text style={styles.HeadText}>{data?.structured_formatting?.main_text}</Text>
				<Text style={styles.text}>{data?.structured_formatting?.secondary_text}</Text>
			</TouchableOpacity>
		</View>
	)

	const openSettings = () => {
        Linking.openSettings()
    }


	return (
		<>

			{homeAdd || route?.params?.mode === "map" && (
			<>
				{/* <Header /> */}
				<CommonHeader heading={'Place'} backBtn />
			</>
			)}

			<View style={styles.container}>

				<TouchableOpacity style={styles.current__btn} onPress={getLocationPermission}>
					<MaterialCommunityIcons name='navigation-variant' size={23} color={COLORS.blue} />
					<Text style={{ color: COLORS.blue, fontFamily: 'Poppins-Medium' }}>Use my current location</Text>
				</TouchableOpacity>

				<GooglePlacesAutocomplete
          isRowScrollable
          keyboardShouldPersistTaps='always'
          placeholder={'Search Location ...'}
          fetchDetails
          minLength={2}
          enablePoweredByContainer={false}
          listViewDisplayed={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          renderRow={renderRow}
          textInputProps={{
            placeholderTextColor: COLORS.light
          }}
          styles={{
            textInput: {
              color: COLORS.light,
              borderWidth: 1,
              borderColor: "#e8e8e8",
              fontFamily: 'Poppins-Regular',
              borderRadius: 8
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              color: 'black', //To see where exactly the list is
              zIndex: 1000, //To popover the component outwards
              position: 'absolute',
              top: 50
            },
          }}
          onPress={addLoc}
          query={{
            key: GOOGLE_API,
            language: 'en'
          }}
        />
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
		</>
	)
        
}


const makeStyle = (color) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		padding: 30,
		paddingTop: 15
	},
	current__btn: {
		flexDirection: 'row',
		position: 'absolute',
		top: 73,
		left: 27
	},
	HeadText: {
		color: COLORS.dark,
		fontFamily: 'Poppins-Medium',
	},
	location: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	locationText: {
		color: 'blue'
	},
	text: {
		color: COLORS.light,
		fontFamily: 'Poppins-Light',
	},
	user: {
		borderBottomWidth: 1,
		borderColor: COLORS.gray,
		paddingVertical: 7
	},
	name: {
		fontFamily: 'Poppins-bold',
		color: color.primary,
		letterSpacing: .6,
		fontSize: 23
	},
	email: {
		color: COLORS.light,
		fontFamily: 'Poppins-Italic',
		fontSize: 12
	},
	logout: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20
	},
	logText: {
		fontSize: 17,
		color: COLORS.dark,
		fontFamily: 'Poppins-Bold'
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

export default GoogleLocation