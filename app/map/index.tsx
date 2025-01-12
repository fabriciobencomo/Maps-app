import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.map}></View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
}) 