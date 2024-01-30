import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import ProfileButton from '../../components/ProfileButton'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import locationContext from '../../context/location/index'


const GoogleLocation = ({ navigation }) => {

  const { location, setLocation } = useContext(locationContext)

  const addLoc = (_, data) => {
    setLocation({
      latitude: data?.geometry?.location?.lat,
      longitude: data?.geometry?.location?.lng,
      address: data?.formatted_address
    })

    navigation.navigate("MapPage")
  }

  const renderRow = (data) => (
    <View style={{ pointerEvents: 'none', flexDirection: 'row', alignItems: 'center' }}>
      <IonIcon name='navigation-variant' size={23} color={COLORS.primary} />

      <TouchableOpacity style={{ marginLeft: 6 }}>
        <Text style={styles.HeadText}>{data?.structured_formatting?.main_text}</Text>
        <Text style={styles.text}>{data?.structured_formatting?.secondary_text}</Text>
      </TouchableOpacity>
    </View>
  )


  return (
    <>
      <CommonHeader heading={'Place'} backBtn />

      <View style={styles.container}>
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
              borderWidth: 1,
              fontFamily: 'Poppins-Medium'
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
            key: 'AIzaSyBBcghyB0FvhqML5Vjmg3uTwASFdkV8wZY',
            language: 'en'
          }}
        />

        {/* <TouchableOpacity style={styles.location}>
          <Text style={styles.locationText}>Use my current location</Text>
        </TouchableOpacity> */}
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
  }
})

export default GoogleLocation