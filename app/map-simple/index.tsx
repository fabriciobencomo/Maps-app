import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 10.1689842,
          longitude: -68.0019041,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} 
      >
        <Marker 
          coordinate={{
            latitude: 10.1689842,
            longitude: -68.0019041,
          }}
          title='Aqui Estoy'
          description='ubicacion actual'
        />

      </MapView>
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