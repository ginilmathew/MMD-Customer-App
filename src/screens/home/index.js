import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
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




const Home = ({ navigation }) => {


    let payload = {
        "coordinates": [
            8.5204866, 76.9371447
        ]
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['Home'],
        queryFn: () => HomeApi(payload),
        enabled: true
    })



    useRefetch(refetch)


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


    const HeaderComponents = memo(({ data, NavigateToCategory }) => {
        return (
            <Animated.View style={{ backgroundColor: '#fff' }}>
                <View style={{ marginVertical: 4 }}>
                    <CustomSlider item={data?.data?.data?.sliders} />
                </View>
                <CustomHeading label={'Categories'} hide={false} marginH={20} />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {data?.data?.data?.categories?.map((res, index) => (
                        <Animated.View  style={{ marginRight: 8 }}>
                            <CategoryCard key={res?._id} item={res} />
                        </Animated.View>
                    ))}
                    <TouchableOpacity style={styles.iconConatiner} onPress={NavigateToCategory}>
                        <Text style={styles.text2}>{'View All'}</Text>
                        <Ionicons name='arrow-forward' color={COLORS.primary} size={20} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ marginTop: 3 }}>
                    <CustomHeading label={'Popular Products'} hide={true} onPress={NavigateToAllPages} marginH={20} />
                </View>
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
        return (
            <>
                <View style={{ marginBottom: 20 }}>
                    <CustomSlider item={data?.data?.data?.sliders} />
                </View>
                <View style={{ marginTop: 2 }}>
                    <CustomHeading label={'HighLights'} hide={false} marginH={20} />
                </View>
                <View style={[styles.boxItem, styles.footerBox]}>
                    {data?.data?.data?.allFeatures?.map((res, index) => (
                        <ItemBox onPress={() => NavigateToFeatured(res)} key={res?._id} item={res} index={index} />
                    ))}
                </View>
                <View style={{ marginBottom: 80 }}>
                </View>
            </>
        )
    }, [data?.data?.data])


    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, [data?.data?.data]);


    if (isLoading) {
        return (
            <HomeLoader />
        )
    }



    return (

        <View style={{ backgroundColor: '#fff' }}>
            <DummySearch press={NavigateToSearch} />
            <FlatList
                data={data?.data?.data.featuredList?.[0]?.featured_list}
                ListHeaderComponent={<HeaderComponents data={data} NavigateToCategory={NavigateToCategory} />}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingHorizontal: 20
    },
    text2: {
        letterSpacing: 1,
        fontSize: 13, // Adjust the font size as needed
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