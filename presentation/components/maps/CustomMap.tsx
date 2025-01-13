import { View, Text, ViewProps, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView from 'react-native-maps';
import { useLocationStore } from '@/presentation/store/useLocationsStore';

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({initialLocation, showUserLocation = true , ...rest}: Props) => {
 
  const {watchLocation, clearWatchLocation} = useLocationStore()
  
  useEffect(() => {
    
    watchLocation()
    
    return () => {
      clearWatchLocation()
    }
  }, [])
  
  return (
    <View {...rest}>
      <MapView 
          showsUserLocation={showUserLocation}
          style={styles.map} 
          initialRegion={{
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
      >
      </MapView>
    </View>
  )
}

export default CustomMap

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
}) 