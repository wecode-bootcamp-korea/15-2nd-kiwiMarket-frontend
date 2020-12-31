import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import { windowWidth } from "../constants/Layout";

const INITIAL_COORINATE = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const CurrentMapView = ({ coordinate = INITIAL_COORINATE }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapView}
      region={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
    >
      <Marker key={1} coordinate={coordinate} />
    </MapView>
  );
};

export default CurrentMapView;

const styles = StyleSheet.create({
  mapView: {
    width: windowWidth * 0.9,
    height: 200,
    marginBottom: 24,
    borderRadius: 4,
  },
});
