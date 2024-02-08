import { AppState, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CustomSlider from '../../components/CustomSlider'
import CustomHeading from '../../components/CustomHeading'
import CategoryCard from '../../components/CategoryCard'
import ItemCard from '../../components/ItemCard'
import { COLORS } from '../../constants/COLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DummySearch from '../../components/DummySearch'
import ItemBox from '../../components/ItemBox'
import locationContext from '../../context/location'
import { useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import { HomeApi } from '../../api/home'
import HomeLoader from '../../components/Loading/Home/HomeLoader'
import { AnimatedView } from 'react-native-reanimated/lib/typescript/reanimated2/component/View'
import Animated, { FadeInDown } from 'react-native-reanimated'
import LocationContext from '../../context/location'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import NoData from '../../components/NoData'
import Header from '../../components/Header'
import CartContext from '../../context/cart'
import reactotron from 'reactotron-react-native'
import { useFocusNotifyOnChangeProps } from '../../hooks/useFocusNotifyOnChangeProps'




const Home = ({ navigation, route }) => {

    const { currentLoc, setMode, getLocation, mode, setHomeFocus } = useContext(LocationContext)
    const checkLocRef = useRef(null)
    const [cart_id] = useMMKVStorage('cart_id', storage);
    const { cartItems, setCartItems } = useContext(CartContext);
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()


    let payload = {
        "coordinates": [
            8.5204866, 76.9371447
        ],
        // coordinates: [currentLoc?.coord?.latitude, currentLoc?.coord?.longitude],
        cartId: cart_id,

    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['Home'],
        retry: false,
        queryFn: () => HomeApi({
            // coordinates: [currentLoc?.coord?.latitude, currentLoc?.coord?.longitude]
            ...payload
        }),
        enabled: false,
        notifyOnChangeProps

    })



    useFocusEffect(useCallback(() => {
        setHomeFocus(true);
        if (currentLoc?.coord?.latitude !== checkLocRef?.current?.latitude) {
            checkLocRef.current = currentLoc?.coord;
            refetch()
        }
    }, [currentLoc]))


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setHomeFocus(false);
        });

        return unsubscribe;
    }, [navigation]);


    const NavigateToCategory = useCallback(() => {
        navigation.navigate('Category')
    }, [navigation])


    const NavigateToAllPages = useCallback(() => {
        navigation.navigate('AllProducts')
    }, [navigation])

    const NavigateToSearch = useCallback(() => {
        navigation.navigate('Search')
    }, [navigation])

    const NavigateToFeatured = useCallback((res) => {
        navigation.navigate('FeaturedProduct', { id: res._id, name: res.name })
    }, [navigation])

    useEffect(() => {
        if (data?.data?.data?.cart?.product?.length > 0) {
            let myStructure = data?.data?.data?.cart?.product?.map((res) => (
                {
                    _id: res?._id,
                    qty: res?.qty,
                    unit_id: res?.unit?.id,
                    varientname: res?.variant?.name,
                    item: { ...res }
                }
            ))
            setCartItems(myStructure)
        }
    }, [data?.data?.data])


    const HeaderComponents = memo(({ data, NavigateToCategory }) => {
        return (
            <Animated.View style={{ backgroundColor: '#fff' }}>
                {
                    data?.data?.data?.sliders?.length > 0 && (
                        <View style={{ marginVertical: 4, marginBottom: 20 }}>
                            <CustomSlider item={data?.data?.data?.sliders} />
                        </View>
                    )
                }
                {data?.data?.data?.categories?.length > 0 && (<>
                    <CustomHeading label={'Categories'} hide={false} marginH={20} />
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        {
                            data?.data?.data?.categories?.map((res, index) => (
                                <Animated.View style={{ marginRight: 8 }}>
                                    <CategoryCard key={res?._id} item={res} />
                                </Animated.View>
                            ))
                        }
                        <TouchableOpacity style={styles.iconConatiner} onPress={NavigateToCategory}>
                            <Text style={styles.text2}>{'View All'}</Text>
                            <Ionicons name='arrow-forward' color={COLORS.primary} size={20} />
                        </TouchableOpacity>
                    </ScrollView>
                </>)}
                {
                    data?.data?.data.featuredList?.[0]?.featured_list && (
                        <View style={{ marginTop: 3 }}>
                            <CustomHeading label={'Popular Products'} hide={true} onPress={NavigateToAllPages} marginH={20} />
                        </View>
                    )
                }
            </Animated.View>

        )
    })

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <Animated.View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard key={index} item={item} />
                </Animated.View>
            </>
        )
    }, [data?.data?.data])


    const ListFooterComponent = useCallback(() => {
        return data?.data?.data?.allFeatures?.length > 0 && (
            <View style={{
                marginBottom: 30
            }}>
                <View style={{ marginBottom: 20 }}>
                    <CustomSlider item={data?.data?.data?.sliders} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CustomHeading label={'HighLights'} hide={false} marginH={20} />
                </View>
                <View style={[styles.boxItem, styles.footerBox]}>
                    {data?.data?.data?.allFeatures?.map((res, index) => (
                        <ItemBox onPress={() => NavigateToFeatured(res)} key={res?._id} item={res} index={index} />
                    ))}
                </View>
                <View style={{ marginBottom: 80 }}>
                </View>
            </View>
        )
    }, [data?.data?.data])


    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, [data?.data?.data]);


    if (isLoading) {
        return (
            <>
                <HomeLoader />
            </>
        )
    }

    const toCart = () => {
        navigation.navigate('Profile')
    }

    const toNotification = () => {
        navigation.navigate('Notification')
    }


    const changeAdd = () => {

    }


    const addLeng = currentLoc?.address?.length;

    return (

        <View style={{ backgroundColor: '#fff' }}>
            {/* {currentLoc?.address && (
                <TouchableOpacity onPress={changeAdd} style={{
                    flexDirection: 'row',
                    paddingLeft: 20,
                    paddingTop: 10,
                    alignItems: 'center'
                }}>
                    <IonIcon name='location' size={23} color={COLORS.primary} />
                    <Text style={{
                        fontSize: 13,
                        color: COLORS.text,
                        marginLeft: 8
                    }}>{currentLoc?.address
                        ?.slice(...addLeng ? [0, 40] : [0])
                        ?.concat(addLeng ? ' ...' : '')}</Text>
                </TouchableOpacity>
            )
            } */}
            <DummySearch press={NavigateToSearch} />
            <FlatList
                data={data?.data?.data.featuredList?.[0]?.featured_list}
                ListHeaderComponent={<HeaderComponents data={data} NavigateToCategory={NavigateToCategory} />}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}
                initialNumToRender={10}
                refreshing={isLoading}
                onRefresh={refetch}
                maxToRenderPerBatch={10}
                windowSize={10}
                getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
                ListEmptyComponent={<NoData />}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    text2: {
        letterSpacing: 1,
        fontSize: 15, // Adjust the font size as needed
        fontWeight: 'bold',
        color: COLORS.primary// Optional: Apply bold styling
    },
    iconConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 2
    },
    footerBox: {
        paddingHorizontal: 18
    },
    boxItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'space-between',
        marginTop: 3
    }

})