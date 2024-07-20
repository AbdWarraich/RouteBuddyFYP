// Account.js

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const Account = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('UserInfo'); 
  };

  const handleBecomeDriver = () => {
    navigation.navigate('DriverHome');
  };

  return (
    <View style={styles.container}>
      
      
      <View style={styles.optionsContainer}>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('MyProfile')}>
          <OptionItem icon="user" label="My Profile" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleBecomeDriver}>
          <OptionItem icon="car" label="Become a Driver" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('postComp')}>
          <OptionItem icon="exclamation-triangle" label="Post a Complaint" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('booking')}>
          <OptionItem icon="history" label="View History" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('driveLoc')}>
          <OptionItem icon="map-marker" label="Driver Location" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('SignIn')}>
        <OptionItem icon="sign-out" label="Logout" style={styles.logout} />
      </TouchableOpacity>
    </View>
  );
};

const OptionItem = ({ icon, label }) => (
  <View style={styles.optionItem}>
    <FontAwesome name={icon} size={24} color="#484848" />
    <Text style={styles.optionLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 10,
  },
  profileContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#808080',
  },
  email: {
    fontSize: 16,
    color: '#808080',
    marginLeft: 20,
  },
  optionsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionLabel: {
    fontSize: 18,
    marginLeft: 15,
    color: '#484848',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  logout: {
    fontSize: 18,
    color: '#FF3B30',
  },
});

export default Account;

