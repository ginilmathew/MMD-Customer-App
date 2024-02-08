import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Modal, PermissionsAndroid } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import ProfileButton from '../../components/ProfileButton'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import locationContext from '../../context/location/index'
import { GOOGLE_API } from '../../constants/API'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import { navigationRef } from '../../navigation/RootNavigation'
import Header from '../../components/Header'
import LocationContext from '../../context/location/index'


const GoogleLocation = ({ navigation, route }) => {

  const { setLocation, getLocation, mode, setCurrentLoc, setModal, setMode, handleModal } = useContext(locationContext)
  const [homeAdd, setHomeAdd] = useMMKVStorage('homeAdd', storage);


  const addLoc = (_, data) => {

    if (mode === 'home') {
      if (!homeAdd) {
        setHomeAdd(true);
      }

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
        address: {
          main: data?.formatted_address.split(',')[0],
          secondary: data?.formatted_address
        }
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

  const renderRow = (data) => (
    <View style={{ pointerEvents: 'none', flexDirection: 'row', alignItems: 'center' }}>
      <MaterialCommunityIcons name='navigation-variant' size={23} color={COLORS.primary} />

      <TouchableOpacity style={{ marginLeft: 6 }}>
        <Text style={styles.HeadText}>{data?.structured_formatting?.main_text}</Text>
        <Text style={styles.text}>{data?.structured_formatting?.secondary_text}</Text>
      </TouchableOpacity>
    </View>
  )


  return (
    <>

      {homeAdd && (<>
        <Header />
        <CommonHeader heading={'Place'} backBtn />
      </>)}

      <View style={styles.container}>

        <TouchableOpacity style={styles.current__btn} onPress={currentLocation}>
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
              color: 'black',
              borderWidth: 0.5,
              fontFamily: 'Poppins-Medium',
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
    </>
  )
}


const styles = StyleSheet.create({
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
    color: COLORS.primary,
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