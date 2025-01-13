import CustomMap from '@/presentation/components/maps/CustomMap'
import { useLocationStore } from '@/presentation/store/useLocationsStore'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => {

  const {lastKnownLocation, getLocation}  = useLocationStore()

  useEffect(() => {
    if(lastKnownLocation === null){
      getLocation()
    }
  }, [])

  if(lastKnownLocation === null){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <CustomMap initialLocation={lastKnownLocation} />
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