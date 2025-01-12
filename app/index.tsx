import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { usePermissionStore } from '@/presentation/store/usePermissions'

const MapsApp = () => {
    const {locationStatus, requestLocationPermission} = usePermissionStore()

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable onPress={requestLocationPermission}>
        <Text>Habilitar Ubicacio estoy en</Text>
      </Pressable>
      <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}

export default MapsApp