import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import ProfileButton from '../../components/ProfileButton'
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const Profile = ({ navigation }) => {

  const navToEdit = useCallback(() => {
    navigation.navigate('EditProfile')
  }, [navigation])

  const navToAddress = useCallback(() => {
    navigation.navigate('Address')
  }, [navigation])

  const navToPasswd = useCallback(() => {
    navigation.navigate('ChangePasswd')
  }, [navigation])

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'logout', onPress: () => {
          navigation.reset({
            index: 0,
            routes: [
              { name: 'Login' }
            ]
          })
        }
      },
    ]);
  }, [navigation])

  return (
    <>
      <CommonHeader heading={'Profile'} />

      <View style={styles.container}>

        <View style={styles.user}>
          <Text style={styles.name}>asdfasdf</Text>
          <Text style={styles.email}>asdfasdfas@gmail.com</Text>
        </View>

        <ProfileButton text={'Edit Profile'} onPress={navToEdit} />
        <ProfileButton text={'Change Password'} onPress={navToPasswd} />
        <ProfileButton text={'Add Address'} onPress={navToAddress} />

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logText}>Logout</Text>
          <IonIcon name='logout' color={COLORS.primary} size={23} />
        </TouchableOpacity>

      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 30
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

export default Profile