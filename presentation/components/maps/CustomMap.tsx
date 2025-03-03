import { View, Text, ViewProps, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView, { Polyline } from 'react-native-maps';
import { useLocationStore } from '@/presentation/store/useLocationsStore';
import FAB from '../shared/FAB';

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({initialLocation, showUserLocation = true , ...rest}: Props) => {

  const mapRef = useRef<MapView>(null)
  const [isFollowingUser, setIsFollowingUser] = useState(true)
  const [isShowingPolyline, setIsShowingPolyline] = useState(true)
 
  const {watchLocation, clearWatchLocation, lastKnownLocation, getLocation, userLocationList} = useLocationStore()
  
  useEffect(() => {
    
    watchLocation()
    
    return () => {
      clearWatchLocation()
    }
  }, [])

  useEffect(() => {
    if(lastKnownLocation && isFollowingUser){
      moveCameraToLocation(lastKnownLocation)
    }
  }, [lastKnownLocation])
  

  const moveCameraToLocation = (latLng: LatLng) => {
    if(!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
    })
  }

  const moveToCurrentLocation = async() => {
    if(!lastKnownLocation){
      moveCameraToLocation(initialLocation);
    }else{
      moveCameraToLocation(lastKnownLocation)
    }
    const location = await getLocation();


    if(!location) return
    moveCameraToLocation(location)
  }
  
  return (
    <View {...rest}>
      <MapView 
          ref={mapRef}
          onTouchStart={() => setIsFollowingUser(false)}
          showsUserLocation={showUserLocation}
          style={styles.map} 
          initialRegion={{
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
      > 
      {
        isShowingPolyline && (
          <Polyline coordinates={userLocationList} strokeColor={'black'} strokeWidth={5} />
        )    
      }
        
      </MapView>
      <FAB iconName='compass-outline' onPress={moveToCurrentLocation} style={{bottom: 20, right:20}}/>
      <FAB iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'} onPress={() => setIsFollowingUser(!isFollowingUser)} style={{bottom: 80, right:20}}/>
      <FAB iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'} onPress={() => setIsShowingPolyline(!isShowingPolyline)} style={{bottom: 140, right:20}}/>
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