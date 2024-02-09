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
import ProductCard from '../../components/ProductCard'
import moment from 'moment'
import CartButton from '../../components/CartButton'




const Home = ({ navigation, route }) => {

    // const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    const { currentLoc, setMode, getLocation, mode, setHomeFocus, location } = useContext(LocationContext)
    const checkLocRef = useRef(null)
    const [cart_id] = useMMKVStorage('cart_id', storage);
    const [time, setTime] = useState(moment().unix())
    const { cartItems, setCartItems, cartChanges, cartTotal } = useContext(CartContext);
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    reactotron.log({cartTotal, cartItems})


    let payload = {
        "coordinates": [
            8.5204866, 76.9371447
        ],
        // coordinates: [location?.location?.latitude, location?.location?.longitude],
        cartId: cart_id,

    }


    // reactotron.log({ payload })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['Home'],
        retry: false,
        queryFn: () => HomeApi({
            ...payload,
        }),
        // notifyOnChangeProps,
        enabled: !!location?.address,
    })



    useFocusEffect(useCallback(() => {

        setTime(moment().unix())

        if (location?.address) {
            refetch()
        }

        // }
    }, [location?.address]))


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
        const cartProducts = data?.data?.data?.cart?.product;

        if (!cartProducts || cartProducts.length === 0) {
            return; // No products or invalid data, no need to proceed further
        }

        const updatedCartItems = cartProducts?.map(product => {
            const { _id, qty, unit, variant } = product;

            return {
                _id,
                qty,
                unit_id: unit?.id,
                varientname: variant?.name,
                item: { ...product }
            };
        });

        //setCartItems(updatedCartItems);
    }, [data?.data?.data]);



    const HeaderComponents = useCallback(() => {
        const sliders = data?.data?.data?.sliders || [];
        const categories = data?.data?.data?.categories || [];
        const featuredList = data?.data?.data?.featuredList?.[0]?.featured_list;

        return (
            <View style={{ backgroundColor: COLORS.white }}>
                {sliders.length > 0 && (
                    <View style={{ marginVertical: 4, marginBottom: 20 }}>
                        <CustomSlider item={sliders} />
                    </View>
                )}
                {categories.length > 0 && (
                    <View style={{ marginTop: 5 }}>
                        <CustomHeading label={'Categories'} hide={false} marginH={20} />
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {categories.map((res) => (
                                <View style={{ marginRight: 8 }} key={res?._id}>
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
                {featuredList && (
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
        const allFeatures = data?.data?.data?.allFeatures || [];

        return (
            allFeatures.length > 0 && (
                <View style={{ marginBottom: 100 }}>
                    <View style={{ marginTop: 20 }}>
                        <CustomHeading label={'HighLights'} hide={false} marginH={20} />
                    </View>
                    <View style={[styles.boxItem, styles.footerBox]}>
                        {allFeatures.map((res, index) => (
                            <ItemBox onPress={() => NavigateToFeatured(res)} key={res?._id} item={res} index={index} />
                        ))}
                    </View>
                    {/* <View style={{ marginBottom: 40 }} /> */}
                </View>
            )
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

    reactotron.log({cartChanges})

    const addLeng = currentLoc?.address?.length;

    return (

        <View style={{ backgroundColor: '#fff' }}>
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
            <FlatList
                data={data?.data?.data.featuredList?.[0]?.featured_list || []}
                ListHeaderComponent={HeaderComponents}
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

            <CartButton bottom={60} />
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
        fontFamily: 'Poppins-Medium',
        marginTop: 2,
        letterSpacing: 1,
        fontSize: 15, // Adjust the font size as needed
        color: COLORS.primary// Optional: Apply bold styling
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
        justifyContent: 'space-between',
        marginTop: 3
    }

})