
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigation'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Navigation />
      </SafeAreaView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  }
})