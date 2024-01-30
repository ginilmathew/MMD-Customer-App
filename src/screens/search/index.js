import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CommonHeader from '../../components/CommonHeader'

const Search = () => {
    return (
        <View>
           
            <Header />
            <CommonHeader heading={'Search'} backBtn />

        </View>
    )
}

export default Search

const styles = StyleSheet.create({})