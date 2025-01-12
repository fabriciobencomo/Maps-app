import * as Location from 'expo-location'
import {PermissionStatus} from '@/infrastructure/interfaces/location'
import { Alert, Linking } from 'react-native';

export const requestLocationPermission = async():Promise<PermissionStatus> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if(status !== 'granted'){
    if(status === 'denied'){
      manualPermissionRequest()
    }
    return PermissionStatus.DENIED;
  }

  return PermissionStatus.GRANTED
}

export const checkLocationPermission = async() => {
  const {status} = await Location.getForegroundPermissionsAsync();

  switch(status) {
    case 'granted':
      return PermissionStatus.GRANTED;
    case 'denied':
      return PermissionStatus.DENIED;
    default:
    return PermissionStatus.UNDETERMINED;
  }
}

const manualPermissionRequest = async() => {
  // mandar a los ajuses de la aplicacion 
  Alert.alert(
    'Permiso de Ubiacion Necesario',
    'Para Continuar debe Habilitar el permiso de location en los ajustes de la app',
    [
      {
        text: 'Abrir Ajustes',
        onPress: () => {
          Linking.openSettings();
        }
      },
      {
        text: 'cancel',
        style: 'destructive'
      }
    ]
  )
}