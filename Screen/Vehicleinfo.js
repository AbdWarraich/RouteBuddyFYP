import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebase } from '../firebase/firebaseConfig'; // Import Firebase configuration

const VehicleInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedVehicle, setSelectedVehicle] = useState('Car');
  const [model, setModel] = useState('2019');
  const [imageUri, setImageUri] = useState(null);
  const [seats, setSeats] = useState('1');
  const [color, setColor] = useState('Red');
  const [uploading, setUploading] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    vehicles: ['Car', 'Van', 'Truck'],
    models: ['2019', '2020', '2021'],
    seats: ['1', '2', '3'],
    colors: ['Red', 'Blue', 'Green'],
  });

  useEffect(() => {
    fetchDropdownData();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const snapshot = await firebase.database().ref('dropdownData').once('value');
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDropdownData(data);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error.message);
    }
  };

  const handleChooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(firebase.storage(), `vehicles/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      throw error;
    }
  };

  const handleNext = async () => {
    let vehicleImageUrl = null;

    if (imageUri) {
      try {
        vehicleImageUrl = await uploadImage(imageUri);
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Failed', 'There was an issue uploading the image. Please try again.');
        return;
      }
    }

    navigation.navigate('Routeinfo', {
      ...route.params,
      selectedVehicle,
      model,
      vehicleImageUri: vehicleImageUrl,
      seats,
      color,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('PersonalInfo')}>
              <Icon name="user" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Personal</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('VehicleInfo')}>
              <Icon name="car" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Vehicle</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('Routeinfo')}>
              <Icon name="road" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Route</Text>
          </View>
        </View>
      </View>

      <View style={styles.borderform}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Type</Text>
          <Picker
            selectedValue={selectedVehicle}
            onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
            style={styles.picker}
          >
            {dropdownData.vehicles.map((vehicle, index) => (
              <Picker.Item key={index} label={vehicle} value={vehicle} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Model</Text>
          <Picker
            selectedValue={model}
            onValueChange={(itemValue) => setModel(itemValue)}
            style={styles.picker}
          >
            {dropdownData.models.map((model, index) => (
              <Picker.Item key={index} label={model} value={model} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Seats</Text>
          <Picker
            selectedValue={seats}
            onValueChange={(itemValue) => setSeats(itemValue)}
            style={styles.picker}
          >
            {dropdownData.seats.map((seat, index) => (
              <Picker.Item key={index} label={seat} value={seat} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Color</Text>
          <Picker
            selectedValue={color}
            onValueChange={(itemValue) => setColor(itemValue)}
            style={styles.picker}
          >
            {dropdownData.colors.map((color, index) => (
              <Picker.Item key={index} label={color} value={color} />
            ))}
          </Picker>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.label}>Vehicle Image</Text>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          )}
          {uploading ? (
            <ActivityIndicator size="large" color="#32a4a8" />
          ) : (
            <Icon name="image" size={80} color="blue" onPress={handleChooseImage} />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
  },
  circle: {
    width: 63,
    height: 63,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#32a4a8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    lineHeight: 90,
  },
  text: {
    paddingTop: 19,
  },
  borderform: {
    flex: 1,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default VehicleInfo;
