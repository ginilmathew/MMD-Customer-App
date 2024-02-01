import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import CustomInput from '../../components/CustomInput'
import CommonButton from '../../components/CommonButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import NoData from '../../components/NoData'
import IonIcons from 'react-native-vector-icons/Ionicons'


const AddAddress = ({ navigation }) => {


  const schema = yup.object({
    passwd: yup.string().required('Password is required'),
    confPasswd: yup.string().oneOf([yup.ref('passwd'), null], 'Password must match').required('Confirm Password required.')
  });


  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const addAddress = useCallback(() => {
    navigation.navigate('GoogleLocation')
  }, [navigation])

  const keyExtractor = useCallback(({ id }) => String(id), [])

  const onRefresh = useCallback(() => {

  }, [])


  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity onPress={() => { }} style={styles.renderItem}>
        <View style={styles.end}>
          <IonIcons name='location' size={25} color={COLORS.blue} />
        </View>

        <View style={styles.box_text}>
          <Text style={styles.text}>{'sdfsasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf'}</Text>
        </View>

        <View style={styles.end}>
          <Text style={[styles.end_text, { color: true ? COLORS.primary : COLORS.light }]}>{true ? 'DEFAULT' : 'SET AS DEFAULT'}</Text>
          <IonIcons name={true ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <>
      <CommonHeader heading={'Address'} backBtn />

      <View style={styles.container}>

        <FlatList
          className='px-2 w-full md:w-5/6 self-center'
          keyExtractor={keyExtractor}
          ListHeaderComponent={<View style={styles.header} />}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
          data={['sdf']}
          renderItem={renderItem}
          ListEmptyComponent={<NoData />}
        />

        <CommonButton text={'Add New Address'} mt='auto' onPress={addAddress} />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15
  },
  renderItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingVertical: 18
  },
  box_text: {
    width: '70%',
    padding: 2
  },
  text: {
    color: COLORS.dark,
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  header: {
    marginTop: 13
  },
  end: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  end_text: {
    fontSize: 9,
    fontFamily: 'Poppins-Medium'
  }
})

export default AddAddress