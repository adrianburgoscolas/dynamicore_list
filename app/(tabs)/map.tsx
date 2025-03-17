import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { LatLng, Marker } from "react-native-maps";

const MapScreen = () => {
  const [location, setLocation] = useState<LatLng>();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ longitude, latitude });
    }
    requestLocationPermission();
  }, []);
  return (
    <View style={styles.constainer}>
      {location &&
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={location} title="Ubicación Actual" />
        </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
