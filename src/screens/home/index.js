import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'

const Home = () => {
  return (
    <View>
      <Header/>
      <CustomSearch/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})