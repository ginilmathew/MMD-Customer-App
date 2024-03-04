import React, { useCallback } from 'react'
import { FlatList, Text ,View} from 'react-native'
import { useQuery } from 'react-query'
import { FeaturedApi } from '../../api/highlights'
import CommonHeader from '../../components/CommonHeader'
import Header from '../../components/Header'
import Animated from 'react-native-reanimated'
import ItemBox from '../../components/ItemBox'

const Highlights = ({navigation}) => {

   

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['HighlightAll'],
        retry: false,
        queryFn: FeaturedApi,
        // notifyOnChangeProps,
        enabled: true,
    })



    const ListFooterComponent = useCallback(() => {


        return (

            <View style={{ marginBottom: 130 }}>

                {/* <View style={{ marginBottom: 40 }} /> */}
            </View>

        );
    }, []);


    const NavigateToFeatured = useCallback((item) => {
        navigation.navigate('FeaturedProduct', { id: item._id, name: item.name })
    }, [navigation])


    const renderItem = ({ item, index }) => {
        return (
            <>
                <Animated.View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                    {/* <ItemCard key={index} item={item} /> */}
                    <ItemBox onPress={() => NavigateToFeatured(item)} key={item?._id} item={item} index={index} />
                </Animated.View>
            </>
        )
    }

    

    return (
        <View style={{ backgroundColor: '#fff',flex:1 }}>
        <Header icon={true}/>
        <CommonHeader heading={"HighLights"} backBtn={true} />
        <FlatList
            contentContainerStyle={{marginRight:10}}
            data={data?.data?.data}
            ListFooterComponent={ListFooterComponent}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
             numColumns={3}
            refreshing={isLoading}
            onRefresh={refetch}
            onEndReachedThreshold={.1}
            // ListEmptyComponent={emptyScreen}
        />
    </View>
    )
}

export default Highlights