import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CustomSlider from '../../components/CustomSlider'
import CustomHeading from '../../components/CustomHeading'
import CategoryCard from '../../components/CategoryCard'

const Home = () => {
  return (
    <View>
      <Header/>
      <CustomSearch/>
      <CustomSlider/>
      <CustomHeading label={'Product'} hide={true}/>
      <CategoryCard/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  
})