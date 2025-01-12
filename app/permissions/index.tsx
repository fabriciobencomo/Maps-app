import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { usePermissionStore } from '@/presentation/store/usePermissions'
import { ThemedText } from '@/presentation/components/shared/ThemedText'
import ThemedPressable from '@/presentation/components/shared/ThemedPressable'

const PermissionScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore()

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ThemedPressable onPress={requestLocationPermission}>
        Habilitar Ubicacion
      </ThemedPressable>
      <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}

export default PermissionScreen