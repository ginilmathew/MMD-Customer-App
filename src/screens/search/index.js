import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'
import CustomSearch from '../../components/CustomSearch'

const Search = () => {

    const DATA2 = [1, 2, 3, 4, 5, 6]

    const ListHeaderComponent = () => {
        return (
            <View>
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
                data={DATA2}
                numColumns={4}
                renderItem={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}

            />

       
    )
}

export default Search

const styles = StyleSheet.create({})