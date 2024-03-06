import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CustomSlider from '../../components/CustomSlider'
import CustomHeading from '../../components/CustomHeading'
import CategoryCard from '../../components/CategoryCard'
import COLORS from '../../constants/COLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DummySearch from '../../components/DummySearch'
import ItemBox from '../../components/ItemBox'
import { useQuery } from 'react-query'
import { HomeApi } from '../../api/home'
import HomeLoader from '../../components/Loading/Home/HomeLoader'
import Animated from 'react-native-reanimated'
import LocationContext from '../../context/location'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../../App'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import NoData from '../../components/NoData'
import CartContext from '../../context/cart'
import { useFocusNotifyOnChangeProps } from '../../hooks/useFocusNotifyOnChangeProps'
import ProductCard from '../../components/ProductCard'
import moment from 'moment'
import CartButton from '../../components/CartButton'
import NotificationContext from '../../context/notification'
import reactotron from '../../ReactotronConfig'




const Home = ({ navigation, route }) => {

    const { width } = useWindowDimensions()

    // const notifyOnChangeProps = useFocusNotifyOnChangeProps()
    const styles = makeStyle(COLORS)

    const { currentLoc, setMode, getLocation, mode, setHomeFocus, location } = useContext(LocationContext)
    const checkLocRef = useRef(null)
    const [cart_id] = useMMKVStorage('cart_id', storage);
    const [time, setTime] = useState(moment().unix())
    const { cartItems, setCartItems, cartChanges, cartTotal } = useContext(CartContext);
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()
    const { setCount } = useContext(NotificationContext);


    let payload = {
        // "coordinates": [
        //     8.5204866, 76.9371447
        // ],
        coordinates: [location?.location?.latitude, location?.location?.longitude],
        // cartId: cart_id,
    }



    const { data, isLoading, refetch } = useQuery({
        queryKey: ['Home'],
        retry: false,
        queryFn: () => HomeApi({
            ...payload,
        }),
        // notifyOnChangeProps,
        enabled: !!location?.address,
    })

    useEffect(() => {
        if (data?.data?.data) {
            setCount(data?.data?.data?.count);
        }
    }, [data])

    useFocusEffect(useCallback(() => {

        setTime(moment().unix())

        if (location?.address) {
            refetch()
        }

        // }
    }, [location?.address]))



    const NavigateToCategory = useCallback(() => {
        navigation.navigate('Category')
    }, [navigation])


    const NavigateToAllPages = useCallback(() => {
        navigation.navigate('AllProducts', {
            mode: 'product'
        })
    }, [navigation])


    const NavigateToOfferPages = useCallback(() => {
        navigation.navigate('Offer')
    }, [])

    const NavigateToSearch = useCallback(() => {
        navigation.navigate('Search')
    }, [navigation])

    const NavigateToFeatured = useCallback((res) => {
        navigation.navigate('FeaturedProduct', { id: res._id, name: res.name })
    }, [navigation])


    const NaviagteToSlder = useCallback(() => {
        null
    }, [])


    const NavigateToHighlights = useCallback(() => {
        navigation.navigate('Highlights')
    }, [])


    const NavigateToMarketingSlider = useCallback((item) => {
        if (item?.type === 'product') {
            let quantity = 0;
            const findProduct = cartItems?.find((res) => res?._id === item?._id);
            if (findProduct) {
                quantity = findProduct?.qty * 1;
            }
            navigation.navigate('SingleProduct', { item: item?.product, quantity })
        } else if (item?.type === 'category') {
            navigation.navigate('SingleCategory', { item: item?.category?.slug })
        }

    }, [navigation])



    const HeaderComponents = useCallback(() => {
        const sliders = data?.data?.data?.sliders || [];
        const categories = data?.data?.data?.categories || [];
        const featuredList = data?.data?.data?.featuredList?.[0]?.featured_list;
        const offerProducts = data?.data?.data?.offerProducts || [];
        const allFeatures = data?.data?.data?.allFeatures || [];
        const MarketingSlider = data?.data?.data?.marketing || [];

        return (
            <View style={{ backgroundColor: COLORS.white }}>
                {data?.data?.data?.sliders?.length > 0 && (
                    <View style={{ marginVertical: 4, marginBottom: 20 }}>
                        <CustomSlider item={data?.data?.data?.sliders} onPress={NaviagteToSlder} />
                    </View>
                )}
                {data?.data?.data?.categories?.length > 0 && (
                    <View style={{ marginTop: 5 }}>
                        <CustomHeading label={'Categories'} hide={false} marginH={20} />
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {data?.data?.data?.categories?.map((res) => (
                                <View style={{ marginRight: 8, width: width / 4 - 20 }} key={res?._id}>
                                    <CategoryCard item={res} />
                                </View>
                            ))}
                            <TouchableOpacity style={styles.iconConatiner} onPress={NavigateToCategory}>
                                <Text style={styles.text2}>{'View All'}</Text>
                                <Ionicons name='arrow-forward' color={COLORS.primary} size={18} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}


                {data?.data?.data?.offerProducts && <View style={{ marginTop: 3 }}>
                    <CustomHeading label={'Todays Offers'} hide={true} onPress={NavigateToOfferPages} marginH={20} />
                    <Animated.View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                        {/* <ItemCard key={index} item={item} /> */}

                        {data?.data?.data?.offerProducts?.map((item, index) => (
                            <View style={{ marginVertical: 5 }}>
                                <ProductCard key={item?._id} item={item} cartItems={cartItems} time={time} />
                            </View>

                        ))}
                    </Animated.View>
                </View>}
                {data?.data?.data?.marketing?.length > 0 && (
                    <>

                        <View style={{ marginVertical: 2, marginBottom: 20 }}>
                            <CustomSlider item={data?.data?.data?.marketing} onPress={NavigateToMarketingSlider} />
                        </View></>

                )}
                <View style={{ marginTop: 5 }}>
                    <CustomHeading label={'HighLights'} hide={true} marginH={20} onPress={NavigateToHighlights} />
                </View>
                <View style={[styles.boxItem, styles.footerBox]}>
                    {data?.data?.data?.allFeatures?.map((res, index) => (
                        <ItemBox onPress={() => NavigateToFeatured(res)} key={res?._id} item={res} index={index} />
                    ))}
                </View>

                {data?.data?.data?.featuredList?.[0]?.featured_list && (
                    <View style={{ marginTop: 3 }}>
                        <CustomHeading label={'Popular Products'} hide={true} onPress={NavigateToAllPages} marginH={20} />
                    </View>
                )}
            </View>
        );
    }, [data?.data?.data]);




    const renderItem = ({ item, index }) => {
        return (
            <>
                <Animated.View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    {/* <ItemCard key={index} item={item} /> */}
                    <ProductCard key={index} item={item} cartItems={cartItems} time={time} />
                </Animated.View>
            </>
        )
    }


    const ListFooterComponent = useCallback(() => {


        return (

            <View style={{ marginBottom: 130 }}>
                {/* <View style={{ marginBottom: 40 }} /> */}
            </View>

        );
    }, [data?.data?.data, NavigateToFeatured]);

    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, [data?.data?.data]);


    if (isLoading || !location?.address) {
        return (
            <>
                <HomeLoader />
            </>
        )
    }

    // const toCart = () => {
    //     navigation.navigate('Profile')
    // }

    // const toNotification = () => {
    //     navigation.navigate('Notification')
    // }


    const changeAdd = () => {

    }


    const addLeng = currentLoc?.address?.length;

    return (

        <View>

            <ScrollView style={{ backgroundColor: '#fff' }}>
                {currentLoc?.address && (
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
                }
                <DummySearch press={NavigateToSearch} />
                <View style={{ backgroundColor: COLORS.white }}>
                    {data?.data?.data?.sliders?.length > 0 && (
                        <View style={{ marginVertical: 4, marginBottom: 20 }}>
                            <CustomSlider item={data?.data?.data?.sliders} onPress={NaviagteToSlder} />
                        </View>
                    )}
                    {data?.data?.data?.categories?.length > 0 && (
                        <View style={{ marginTop: 5 }}>
                            <CustomHeading label={'Categories'} hide={false} marginH={20} />
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollViewContent}
                            >
                                {data?.data?.data?.categories?.map((res) => (
                                    <View style={{ marginRight: 8, width: width / 4 - 20 }} key={res?._id}>
                                        <CategoryCard item={res} />
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.iconConatiner} onPress={NavigateToCategory}>
                                    <Text style={styles.text2}>{'View All'}</Text>
                                    <Ionicons name='arrow-forward' color={COLORS.primary} size={18} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    )}


                    {data?.data?.data?.offerProducts && <View style={{ marginTop: 3 }}>
                        <CustomHeading label={'Todays Offers'} hide={true} onPress={NavigateToOfferPages} marginH={20} />
                        <Animated.View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                            {/* <ItemCard key={index} item={item} /> */}

                            {data?.data?.data?.offerProducts?.map((item, index) => (
                                <View style={{ marginVertical: 5 }}>
                                    <ProductCard key={index} item={item} cartItems={cartItems} time={time} />
                                </View>

                            ))}
                        </Animated.View>
                    </View>}
                    {data?.data?.data?.marketing?.length > 0 && (
                        <>

                            <View style={{ marginVertical: 2, marginBottom: 20 }}>
                                <CustomSlider item={data?.data?.data?.marketing} onPress={NavigateToMarketingSlider} />
                            </View></>

                    )}
                    <View style={{ marginTop: 5 }}>
                        <CustomHeading label={'HighLights'} hide={true} marginH={20} onPress={NavigateToHighlights} />
                    </View>
                    <View style={[styles.boxItem, styles.footerBox]}>
                        {data?.data?.data?.allFeatures?.map((res, index) => (
                            <ItemBox onPress={() => NavigateToFeatured(res)} key={res?._id} item={res} index={index} />
                        ))}
                    </View>

                    {data?.data?.data?.featuredList?.[0]?.featured_list && (
                        <View style={{ marginTop: 3 }}>
                            <CustomHeading label={'Popular Products'} hide={true} onPress={NavigateToAllPages} marginH={20} />
                        </View>
                    )}
                </View>

                <FlatList
                    data={data?.data?.data.featuredList?.[0]?.featured_list || []}
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
                    ListEmptyComponent={<NoData heights={500} />}
                    extraData={cartTotal}
                />


            </ScrollView>

            <CartButton bottom={20} />
        </View>
    )
}

export default Home

const makeStyle = (color) => StyleSheet.create({
    scrollViewContent: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    text2: {
        fontFamily: 'Poppins-Medium',
        marginTop: 2,
        letterSpacing: 1,
        fontSize: 15, // Adjust the font size as needed
        color: color.primary// Optional: Apply bold styling
    },
    iconConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },
    footerBox: {
        paddingHorizontal: 18
    },
    boxItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        // justifyContent: 'space-between',
        marginTop: 3
    }

})