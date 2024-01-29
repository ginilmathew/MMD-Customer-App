import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import CustomSearch from '../../components/CustomSearch'
import CustomSlider from '../../components/CustomSlider'
import CustomHeading from '../../components/CustomHeading'
import CategoryCard from '../../components/CategoryCard'
import ItemCard from '../../components/ItemCard'

const Home = () => {
  return (
    <View>
      <Header/>
      <CustomSearch/>
      <CustomSlider/>
      <CustomHeading label={'Category'} hide={false}/>
      <CategoryCard/>
      <CustomHeading label={'Product'} hide={true}/>
      <ItemCard/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  
})