import { StyleSheet, Text, View, FlatList, ScrollView, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'
import CustomTab from '../../components/CustomTab'
import { COLORS } from '../../constants/COLORS'
import reactotron from 'reactotron-react-native'
import { useMutation, useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import { getCatProducts } from '../../api/IndividualCategory'
import { postcategorybySub } from '../../api/category'
import NoData from '../../components/NoData'
import CartContext from '../../context/cart'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import ProductCard from '../../components/ProductCard'
import CartButton from '../../components/CartButton'

const SingleCategory = ({ route }) => {

    const {height} = useWindowDimensions();
    const { cartItems } = useContext(CartContext);
    const [time, setTime] = useState(moment().unix())

    const item = route?.params;

    const [subList, setSubList] = useState("")
    const [listItem, setListItem] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([]);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['catProducts-query'],
        queryFn: () => getCatProducts(item?.item),
        enabled: true,
        onSuccess: (data) => {
            setListItem(data?.data?.data?.products);
            setSubCategoryList(data?.data?.data?.SubCategory)
        }
    })


    const { mutate, refetch: postsubrefetch } = useMutation({
        mutationKey: 'subcategory',
        mutationFn: postcategorybySub,
        onSuccess: (data) => {
            setListItem(data?.data?.data?.products);
        }

    })

    useFocusEffect(
        useCallback(() => {
            setTime(moment().unix())
        }, [])
    )

    useRefetch(refetch)




    const AnimatedStyles = useCallback((index, count) => {
        return FadeInDown.delay(index * count).duration(200).springify().damping(12);
    }, []);

    const onChangeSub = useCallback((value) => {
        setSubList(value)
        mutate(value?.slug)
    }, [])


    const ListHeaderComponents = useCallback(({ _, index }) => {
        return (
            <View style={{ backgroundColor: COLORS.white }}>
                <Header />
                <CommonHeader heading={data?.data?.data?.category?.name || []} backBtn />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.subScroll}
                >
                    <RenderHeaderMemo subList={subList} LIST={subCategoryList} AnimatedStyle={AnimatedStyles} key={index} onPress={onChangeSub} />
                </ScrollView>
            </View>
        )

    }, [AnimatedStyles, data?.data?.data, subList,listItem])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <MainRenderMemo AnimatedStyle={AnimatedStyles} item={item} index={index} cartItems={cartItems} time={time} />
            </>
        )
    }, [AnimatedStyles, data?.data?.data, time])

    const ListFooterComponent = useCallback(() => {
        return (
            <View style={{ marginBottom: 80 }} />
        )
    }, [])

    const emptyScreen = () => {
        return (
            <NoData />
        )
    }

    const mainRefetch = () => {
        setListItem([])
        setSubList('')
        refetch()
    }


    return (

        <>
            <FlatList
                stickyHeaderIndices={[0]}
                data={listItem}
                ListHeaderComponent={ListHeaderComponents}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                initialNumToRender={10}
                refreshing={isLoading}
                onRefresh={mainRefetch}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={emptyScreen}
                contentContainerStyle={{ backgroundColor: COLORS.white, flexGrow: 1 }}
            />

            <CartButton bottom={20} />
        </>

    )
}

const styles = StyleSheet.create({
    tabConatiner: {
        paddingHorizontal: 20,
    },
    tabView: {
        gap: 5,
        flexDirection: 'row'
    },
    subScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 10
    }
})

const RenderHeaderMemo = memo(({ LIST, AnimatedStyle, onPress, subList }) => {
    return (
        <>
            {LIST?.map((res, index) => (
                <Animated.View entering={AnimatedStyle(index, 50)} style={{ marginRight: 10 }} key={index}>
                    <CustomTab label={res?.name} onPress={() => onPress(res)} subList={subList} />
                </Animated.View>
            ))}
        </>

    )
})

const MainRenderMemo = memo(({ item, AnimatedStyle, index, cartItems, time }) => {
    return (
        <Animated.View entering={AnimatedStyle(index, 100)} >
            <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                {/* <ItemCard item={item} key={item._id} /> */}
                <ProductCard key={item._id} item={item} cartItems={cartItems} time={time} />
            </View>
        </Animated.View>

    )
})




export default SingleCategory