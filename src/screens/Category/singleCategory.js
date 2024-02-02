import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ItemCard from '../../components/ItemCard'
import CustomTab from '../../components/CustomTab'
import { COLORS } from '../../constants/COLORS'
import reactotron from 'reactotron-react-native'
import { useQuery } from 'react-query'
import useRefetch from '../../hooks/useRefetch'
import { getCatProducts } from '../../api/IndividualCategory'

const SingleCategory = ({ route }) => {

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

    useRefetch(refetch)




    const AnimatedStyles = useCallback((index, count) => {
        return FadeInDown.delay(index * count).duration(200).springify().damping(12);
    }, []);

    const onChangeSub = useCallback((value) => {
        setSubList(value)
    }, [])


    const ListHeaderComponents = useCallback(({ item, index }) => {
        return (
            <View style={{ padding: 8, backgroundColor: COLORS.white }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <RenderHeaderMemo subList={subList} LIST={subCategoryList} AnimatedStyle={AnimatedStyles} key={index} onPress={onChangeSub} />
                </ScrollView>
            </View>
        )

    }, [AnimatedStyles, data?.data?.data, subList])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <MainRenderMemo AnimatedStyle={AnimatedStyles} item={item} index={index} />
            </>
        )
    }, [AnimatedStyles, data?.data?.data])

    const ListFooterComponent = useCallback(() => {
        return (
            <View style={{ marginBottom: 60 }}>

            </View>
        )
    }, [])


    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Header />
            <CommonHeader heading={data?.data?.data?.category?.name || []} backBtn />
            <FlatList
                stickyHeaderIndices={[0]}
                data={listItem}
                ListHeaderComponent={ListHeaderComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tabConatiner: {
        paddingHorizontal: 20,
    },
    tabView: {
        gap: 5,
        flexDirection: 'row'
    }
})

const RenderHeaderMemo = memo(({ LIST, AnimatedStyle, onPress, subList }) => {
    return (
        <>
            {LIST?.map((res, index) => (
                <Animated.View entering={AnimatedStyle(index, 100)} style={{ marginRight: 10 }}>

                    <CustomTab label={res?.name} onPress={() => onPress(res)} subList={subList} />
                </Animated.View>
            ))}
        </>

    )
})

const MainRenderMemo = memo(({ item, AnimatedStyle, index }) => {
    return (
        <Animated.View entering={AnimatedStyle(index, 200)} >
            <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <ItemCard item={item} />
            </View>
        </Animated.View>

    )
})




export default SingleCategory