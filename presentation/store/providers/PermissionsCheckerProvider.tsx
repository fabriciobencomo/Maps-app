import { View, Text, AppState } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import { usePermissionStore } from '../usePermissions'
import { PermissionStatus } from '@/infrastructure/interfaces/location'
import { router } from 'expo-router'

const PermissionsCheckerProvider = ({children}: PropsWithChildren) => {

  const {locationStatus, checkLocationPermission} = usePermissionStore()

  useEffect(() => {
    if(locationStatus === PermissionStatus.GRANTED){
      router.replace('/map')
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace('/permissions')
    }

  }, [locationStatus])
  

  useEffect(() => {
    checkLocationPermission
  }, [])
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if( nextAppState === 'active'){
        checkLocationPermission()
      }    
    })

    return () => {
      subscription.remove()
    }
  }, [])
  

  return (
      <>{children}</>
  )
}

export default PermissionsCheckerProvider