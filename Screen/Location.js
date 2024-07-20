import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo icons
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps'; // Import MapView and Polyline

const Location = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  // Function to handle submission of location and destination
  const handleSubmit = () => {
    // Here you can handle the submission, for example, navigate to the next screen
    console.log('Origin:', origin);
    console.log('Destination:', destination);
    // Here you can fetch the route coordinates between origin and destination and set them
    // For simplicity, let's just add some dummy coordinates
    setCoordinates([
      { latitude: 32.166351, longitude: 74.195900 },
      { latitude: 32.166351, longitude: 74.195900 },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.line}></View>
        <Ionicons name="location-sharp" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Enter pick-up location"
          value={origin}
          onChangeText={setOrigin}
        />
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.line}></View>
        <Ionicons name="navigate" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>
      <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {coordinates.length > 0 && <Polyline coordinates={coordinates} strokeWidth={4} strokeColor="blue" />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Location;
