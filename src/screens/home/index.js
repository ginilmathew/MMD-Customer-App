import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import Header from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CustomSlider from '../../components/CustomSlider'
import CustomHeading from '../../components/CustomHeading'
import CategoryCard from '../../components/CategoryCard'
import ItemCard from '../../components/ItemCard'
import { COLORS } from '../../constants/COLORS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DummySearch from '../../components/DummySearch'
import ItemBox from '../../components/ItemBox'
import Animated from 'react-native-reanimated'
import locationContext from '../../context/location'


const Home = ({ navigation }) => {

    const { getLocation, location } = useContext(locationContext)

    console.log(location?.location);


    const DATA = 
        [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
    


    const DATA2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]


    const NavigateToCategory = useCallback(() => {
        navigation.navigate('Category')
    }, [navigation])


    const NavigateToAllPages = useCallback(() => {
        navigation.navigate('AllProducts')
    }, [navigation])

    const NavigateToSearch = useCallback(() => {
        navigation.navigate('Search')
    }, [navigation])




    useEffect(() => {
        getLocation()
    }, [])


    const HeaderComponents = useCallback(() => {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <View style={{ marginVertical: 4 }}>
                    <CustomSlider />
                </View>
                <CustomHeading label={'Categories'} hide={false} />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {DATA2?.map((res, index) => (
                        <View style={{ marginRight: 8 }}>
                            <CategoryCard key={index} />
                        </View>

                    ))}
                    <TouchableOpacity style={styles.iconConatiner} onPress={NavigateToCategory}>
                        <Text style={styles.text2}>{'View All'}</Text>
                        <Ionicons name='arrow-forward' color={COLORS.primary} size={20} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ marginTop: 3 }}>
                    <CustomHeading label={'Popular Products'} hide={true} onPress={NavigateToAllPages} />
                </View>
            </View>

        )
    }, [])

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <ItemCard key={index}  item={item}/>
                </View>
            </>
        )
    }, [])


    const ListFooterComponent = useCallback(() => {
        return (
            <Animated.View>
                <View style={{ marginBottom: 20 }}>
                    <CustomSlider />
                </View>
                <View style={{ marginTop: 2 }}>
                    <CustomHeading label={'HighLights'} hide={false} />
                </View>
                <View style={[styles.boxItem, styles.footerBox]}>
                    {DATA2?.map((res, index) => (
                        <ItemBox onPress={NavigateToAllPages} index={index} />
                    ))}
                </View>
                <View style={{ marginBottom: 80 }}>
                </View>
            </Animated.View>
        )
    }, [])




    return (

        <View style={{ backgroundColor: '#fff' }}>
            <DummySearch press={NavigateToSearch} />
            <FlatList
                data={DATA}
                ListHeaderComponent={HeaderComponents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooterComponent}
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