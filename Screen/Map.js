import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const Map = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTime, setSelectedTime] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedSubOperator, setSelectedSubOperator] = useState('All'); // New state for subOperator
  const [modalVisible, setModalVisible] = useState(false);
  const [availableTimes, setAvailableTimes] = useState(['All']);
  const [availableVehicles, setAvailableVehicles] = useState(['All']);
  const [availablePrices, setAvailablePrices] = useState(['All']);
  const [availableSubOperators, setAvailableSubOperators] = useState(['All']); // New state for subOperator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverRef = firebase.database().ref('driverRef/vehicleData');
        const snapshot = await driverRef.once('value');
        const fetchedData = snapshot.exists() ? Object.entries(snapshot.val()) : [];
        console.log(fetchedData);

        const formattedData = fetchedData.map(([key, value]) => ({
          id: key,
          firstName: value.firstName,
          lastName: value.lastName,
          vehicleType: value.vehicleType,
          price: value.price,
          time: value.time,
          subOperator: value.subOperator || 'N/A', // Ensure subOperator is included
          licenseImageUrl: value.licenseImageUrl || "https://firebasestorage.googleapis.com/v0/b/route-budy-a5648.appspot.com/o/vehicles%2F1720670511070?alt=media&token=32977150-e705-4aeb-99e6-d1a89cf67b4b",
        }));

        setData(formattedData);
        setFilteredData(formattedData);

        const uniqueTimes = [...new Set(formattedData.map(driver => driver.time))];
        const uniqueVehicles = [...new Set(formattedData.map(driver => driver.vehicleType))];
        const uniquePrices = ['<10000', '10000-20000', '>20000']; // Assuming fixed categories for price range
        const uniqueSubOperators = [...new Set(formattedData.map(driver => driver.subOperator))];

        setAvailableTimes(['All', ...uniqueTimes.filter(Boolean)]);
        setAvailableVehicles(['All', ...uniqueVehicles.filter(Boolean)]);
        setAvailablePrices(['All', ...uniquePrices]);
        setAvailableSubOperators(['All', ...uniqueSubOperators.filter(Boolean)]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = data;

    filtered = filtered.filter(driver => {
      const matchesTime = selectedTime === 'All' || (driver.time && driver.time === selectedTime);
      const matchesVehicle = selectedVehicle === 'All' || (driver.vehicleType && driver.vehicleType === selectedVehicle);
      const matchesPrice = selectedPrice === 'All' ||
        (selectedPrice === '<10000' && parseFloat(driver.price) < 10000) ||
        (selectedPrice === '10000-20000' && parseFloat(driver.price) >= 10000 && parseFloat(driver.price) <= 20000) ||
        (selectedPrice === '>20000' && parseFloat(driver.price) > 20000);
      const matchesSubOperator = selectedSubOperator === 'All' || (driver.subOperator && driver.subOperator === selectedSubOperator);

      return matchesTime && matchesVehicle && matchesPrice && matchesSubOperator;
    });

    setFilteredData(filtered);
    setModalVisible(false);
  };
  const renderItem = ({ item }) => {
    console.log(item.id);
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          // try {
            navigation.navigate('Driver', { driverData: item });
          // } catch (e) {
          //   console.error('Navigation error:', e.message);
          // }
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.licenseImageUrl }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.driverName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.vehicleDetails}>
            Vehicle: {item.vehicleType || 'N/A'}
          </Text>
          <Text style={styles.paymentInfo}>
            Monthly PKR: {item.price || 'N/A'}
          </Text>
          <Text style={styles.subOperatorInfo}>
            Sub-Operator: {item.subOperator || 'N/A'} {/* Display subOperator */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Drivers</Text>

      <TouchableOpacity
        style={styles.applyFiltersButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.applyFiltersButtonText}>Apply Filters</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Filters</Text>

            <Picker
              selectedValue={selectedTime}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
            >
              {availableTimes.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>
            
            <Picker
              selectedValue={selectedVehicle}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
            >
              {availableVehicles.map((vehicle, index) => (
                <Picker.Item key={index} label={vehicle} value={vehicle} />
              ))}
            </Picker>
            
            <Picker
              selectedValue={selectedPrice}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedPrice(itemValue)}
            >
              {availablePrices.map((price, index) => (
                <Picker.Item key={index} label={price} value={price} />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedSubOperator}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedSubOperator(itemValue)}
            >
              {availableSubOperators.map((subOperator, index) => (
                <Picker.Item key={index} label={subOperator} value={subOperator} />
              ))}
            </Picker>

            <Button title="Apply" onPress={applyFilters} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  paymentInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32a4a8',
  },
  subOperatorInfo: {
    fontSize: 14,
    color: '#333',
  },
  applyFiltersButton: {
    backgroundColor: '#32a4a8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  applyFiltersButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default Map;
