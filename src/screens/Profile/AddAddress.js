import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CommonButton from '../../components/CommonButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { COLORS } from '../../constants/COLORS'
import CommonHeader from '../../components/CommonHeader'
import NoData from '../../components/NoData'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useMutation, useQuery } from 'react-query'
import { addressList, deletAddrss } from '../../api/Profile'
import useRefetch from '../../hooks/useRefetch'
import Header from '../../components/Header'


const AddAddress = ({ navigation }) => {


  const [refresh, setRefresh] = useState(false);

  const { refetch, data } = useQuery({
    queryKey: ['address-query'],
    
    queryFn: addressList,
    initialData: [],
    onSettled() {
      setRefresh(false)
    },
  })

  const { mutate } = useMutation({
    mutationKey: ['address-delet'],
    mutationFn: deletAddrss,
  })

  useRefetch(refetch)

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

  const keyExtractor = useCallback((item) => item?._id, [])

  const onRefresh = useCallback(() => {
    setRefresh(true)
    refetch()
  }, [])

  const handleDlt = useCallback(() => {

  }, [])

  const renderItem = useCallback(({ item }) => {

    const descLeng = item?.area?.address > 45;

    return (
      <TouchableOpacity onPress={() => { }} style={styles.renderItem}>
        <View style={[styles.end, { width: '15%' }]}>
          <IonIcons name='location' size={25} color={COLORS.blue} />
        </View>

        <View style={styles.box_text}>
          <Text style={styles.text}>{
            item?.area?.address
              ?.slice(...descLeng ? [0, 45] : [0])
              ?.concat(descLeng ? ' ...' : '')
          }</Text>
        </View>

        <View style={styles.end}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <Text style={[styles.end_text, { color: item?.default ? COLORS.primary : COLORS.light }]}>{item?.default ? 'DEFAULT' : 'SET AS DEFAULT'}</Text> */}
            <IonIcons name={item?.default ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
          </View>

          <TouchableOpacity style={{
            marginTop: 16
          }} onPress={handleDlt}>
            <IonIcons name='trash' size={18} color={COLORS.red} />
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    )
  }, [])

  
  return (
    <>

      <Header />
      <CommonHeader heading={'Address'} backBtn />

      <View style={styles.container}>

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          ListHeaderComponent={<View style={styles.header} />}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
          data={data?.data?.data}
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
    paddingVertical: 14
  },
  box_text: {
    width: '65%',
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
    width: '20%',
  },
  end_text: {
    fontSize: 7,
    fontFamily: 'Poppins-Medium'
  }
})

export default AddAddress