import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  // Define functions to handle button presses
  const handleCostPress = () => {
    console.log('Time button pressed');
  };

  const handleSearchPress = () => {
    console.log('Search button pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('Location')}>
        <Ionicons name="navigate-circle-outline" size={24} color="white" style={styles.notificationIcon} />
        <Text style={styles.buttonText}>Set location</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Text style={styles.searchPromptText}>Where To?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
          <View style={styles.searchBarContainer}>
            <Ionicons name="search-outline" size={24} color="#707070" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Where are you going?"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* Add Image component with your image source here */}
      <Image source={require('../assets/home.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  locationButton: {
    backgroundColor: '#32a4a8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
  },
  searchPromptText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300, 
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: 70, 
  },
});

export default Home;