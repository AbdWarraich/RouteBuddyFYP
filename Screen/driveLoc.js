import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DriverLiveLocation = () => {
    const navigation = useNavigation();
  const [driverLocation, setDriverLocation] = useState(null);

  // Simulated driver location data
  const simulateDriverLocation = () => {
    // Simulate driver moving around by updating location at intervals
    setInterval(() => {
      // Generate random coordinates within a specific area (for demonstration)
      const lat = 37.7749 + (Math.random() - 0.5) * 0.1;
      const lng = -122.4194 + (Math.random() - 0.5) * 0.1;
      setDriverLocation({ latitude: lat, longitude: lng });
    }, 2000); // Update every 2 seconds
  };

  useEffect(() => {
    // Simulate driver location when the component mounts
    simulateDriverLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749, // Initial latitude (e.g., San Francisco)
          longitude: -122.4194, // Initial longitude (e.g., San Francisco)
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="Driver's live location"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default DriverLiveLocation;
