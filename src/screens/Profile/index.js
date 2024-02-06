import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import ProfileButton from '../../components/ProfileButton'
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { queryClient, storage } from '../../../App'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { useQuery } from 'react-query'
import { getProfile } from '../../api/Profile'
import useRefetch from '../../hooks/useRefetch'
import LocationContext from '../../context/location'
import { navigationRef } from '../../navigation/RootNavigation'


const Profile = ({ navigation }) => {

  const [user, setUser] = useMMKVStorage('user', storage)
  const { setMode } = useContext(LocationContext)


  const { data, refetch } = useQuery('profile-query', {
    queryFn: getProfile,
    onSuccess({ data }) {
      setUser({ ...user, user: data })
    }
  })

  useRefetch(refetch)

  const navToEdit = useCallback(() => {
    navigation.navigate('EditProfile')
  }, [navigation])

  const navToAddress = useCallback(() => {
    navigation.navigate('Address')
  }, [navigation])

  const navToPasswd = useCallback(() => {
    navigation.navigate('ChangePasswd')
  }, [navigation])


  const logout = () => {
    queryClient.resetQueries();
    storage.clearStore();
    setMode('');


    navigation.reset({
      index: 0,
      routes: [
        { name: 'Login' },
      ]
    })
  }

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'logout', onPress: logout
      },
    ]);
  }, [navigation])

  return (
    <>
      <CommonHeader heading={'Profile'} />

      <View style={styles.container}>

        <View style={styles.user}>
          <Text style={styles.name}>{data?.data?.name}</Text>
          <Text style={styles.email}>{data?.data?.email}</Text>
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