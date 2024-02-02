import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import CustomSearch from '../../components/CustomSearch'
import { COLORS } from '../../constants/COLORS'
import { useQuery } from 'react-query'
import { getSearchList } from '../../api/Search'
import useRefetch from '../../hooks/useRefetch'

const Search = () => {

    const DATA2 = [1, 2, 3, 4, 5, 6]


    const { data, refetch } = useQuery({
        queryKey: ['search-query'],
        queryFn: () => getSearchList(),
        enabled: true
    })

    useRefetch(refetch)

    const ListHeaderComponent = () => {
        return (
            <View style={{backgroundColor: COLORS.white}}>
                <Header />
                <CommonHeader heading={'Search'} backBtn />
                <View>
                    <CustomSearch/>
                </View>
            </View>
        )
    }


    const renderSectionHeader = () => {
        return (
            <View>
                <Text>dgdgf</Text>
            </View>
        )
    }

    return (

            <FlatList
               
                StickyHeaderComponent={[0]}
                ListHeaderComponent={ListHeaderComponent}
                data={data}
                numColumns={4}
                renderItem={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{backgroundColor: COLORS.white, flex: 1}}

            />

       
    )
}

export default Search

const styles = StyleSheet.create({})