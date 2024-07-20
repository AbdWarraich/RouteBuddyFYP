import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const Routeinfo = () => {
  const navigation = useNavigation();
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');

  const [startPointError, setStartPointError] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [priceError, setPriceError] = useState('');

  const handleSaveData = () => {
    let isValid = true;

    if (!startPoint.trim()) {
      setStartPointError('Starting Point is required');
      isValid = false;
    } else {
      setStartPointError('');
    }

    if (!destination.trim()) {
      setDestinationError('Destination is required');
      isValid = false;
    } else {
      setDestinationError('');
    }

    if (!price.trim()) {
      setPriceError('Price is required');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!isValid) return;

    const database = firebase.database();

    database.ref('Routeinfo').push({
      startPoint: startPoint,
      destination: destination,
      price: price,
    }).then(() => {
      console.log('Route info saved successfully');
      navigation.navigate('DriverPortfolio');
    }).catch(error => {
      console.error('Error saving route info:', error);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Starting Point</Text>
            <TextInput
              style={[styles.input, startPointError ? styles.inputError : null]}
              placeholder="Enter starting point"
              value={startPoint}
              onChangeText={text => setStartPoint(text)}
            />
            {startPointError ? <Text style={styles.errorText}>{startPointError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={[styles.input, destinationError ? styles.inputError : null]}
              placeholder="Enter destination"
              value={destination}
              onChangeText={text => setDestination(text)}
            />
            {destinationError ? <Text style={styles.errorText}>{destinationError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price (in PKR)</Text>
            <TextInput
              style={[styles.input, priceError ? styles.inputError : null]}
              placeholder="Enter price"
              value={price}
              onChangeText={text => setPrice(text)}
            />
            {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSaveData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginTop: 110,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#32a4a8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconText: {
    color: '#333',
    fontSize: 14,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Routeinfo;
