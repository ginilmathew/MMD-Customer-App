import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import React, { memo, useCallback, useContext, useState, useEffect } from 'react'
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
import { addressList, defaultAddrss, deletAddrss } from '../../api/Profile'
import useRefetch from '../../hooks/useRefetch'
import Header from '../../components/Header'
import { storage } from '../../../App'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import locationContext from '../../context/location/locationContext'
import reactotron from 'reactotron-react-native'
import LocationContext from '../../context/location'


const EditAddress = ({ navigation, route }) => {

    const { setMode } = useContext(LocationContext)
    const { cartID } = route?.params;

    reactotron.log(cartID, "ID")

    const [refresh, setRefresh] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState("");

    const { refetch, data } = useQuery({
        queryKey: ['address-query'],

        queryFn: addressList,
        initialData: [],
        onSettled() {
            setRefresh(false)
        },
    })



    useEffect(() => {
        const defaultAddressData = data?.data?.data?.find((item) => item?.default === true);
        setDefaultAddress(defaultAddressData);
    }, [defaultAddress, data]);

    const { mutate: mutateDefault } = useMutation({
        mutationKey: ['address-delet'],
        mutationFn: defaultAddrss,
        onSuccess(data) {
            storage.setString('success', 'Success')
            refetch()
        }
    })

    const { mutate: mutateDlt } = useMutation({
        mutationKey: ['address-delet'],
        mutationFn: deletAddrss,
        onSuccess() {
            storage.setString('success', 'Address deleted')
            refetch()
        }
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
        setMode('map')
        navigation.navigate('GoogleLocation', { cartID: route?.params?.cartID, mode: 'map' })
    }, [navigation])

    const goToCheckout = useCallback(() => {
        navigation.navigate('Checkout', { item: defaultAddress, cart_ID: cartID })
    }, [navigation, defaultAddress])


    const keyExtractor = useCallback((item) => item?._id, [])

    const onRefresh = useCallback(() => {
        setRefresh(true)
        refetch()
    }, [])

    const handleDlt = useCallback((id) => {
        Alert.alert('Delete', 'Are you sure you want to Delete?', [
            {
                text: 'cancel',
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: () => mutateDlt(id)
            },
        ]);
    }, [])


    const renderItem = useCallback(({ item }) => {

        const descLeng = item?.area?.address > 45;


        return (
            <View>
                <TouchableOpacity onPress={() => { mutateDefault(item?._id); setDefaultAddress(item); }} style={styles.renderItem}>
                    <View style={[styles.end, { width: '10%' }]}>
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
                            <IonIcons name={(item?.default) ? 'radio-button-on' : `radio-button-off`} size={20} color={COLORS.primary} />
                        </View>

                        {/* {
              !item?.default && (
                <TouchableOpacity style={{
                  marginTop: 16
                }} onPress={() => handleDlt(item?._id)}>
                  <IonIcons name='trash' size={18} color={COLORS.red} />
                </TouchableOpacity>
              )
            } */}
                    </View>

                </TouchableOpacity>
            </View>
        )
    }, [])


    return (
        <>

            <Header />
            <CommonHeader heading={'Edit Address'} backBtn />

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
                <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
                    <TouchableOpacity style={styles.addBTN} onPress={addAddress}>
                        <Ionicons name="add" size={40} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <CommonButton text={'Proceed'} mt='auto' onPress={goToCheckout} />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    renderItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        paddingVertical: 14,
    },
    box_text: {
        width: '70%',
        padding: 2
    },
    text: {
        color: COLORS.light,
        fontFamily: 'Poppins-Medium',
        fontSize: 12
    },
    header: {
        marginTop: 13
    },
    end: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    end_text: {
        fontSize: 7,
        fontFamily: 'Poppins-Medium'
    },
    addBTN: {
        backgroundColor: COLORS.blue,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        elevation: 5,
        shadowColor: COLORS.light
    }
})

export default EditAddress