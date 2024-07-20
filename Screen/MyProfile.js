import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DriverProfileScreen = ({ navigation }) => {

    const driver = {
    
        name: 'Abdullah',
        Number: '0336-1400373',
        profilePic: 'https://via.placeholder.com/150',
        vehiclePics: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
          // Add more vehicle image URLs as needed
        ],
      };


  const [driverInfo, setDriverInfo] = useState({
    driverName: 'Ahmed Shahin',
    rating: 4.9,
    drivingInfo: 'Update Driving Info',
    assignedVehicles: 'Assigned Vehicles',
    routeInfo: 'Route Information',
  });

  const handleSupportPress = () => {
    navigation.navigate('SupportScreen');
  };

  const handleLogoutPress = () => {
    navigation.navigate('LogoutScreen');
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.content}>
        <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
              <Image source={require('../assets/acc.jpeg')} style={styles.image} />
            </View>
          <Text style={styles.driverName}>{driverInfo.driverName}</Text>
          <Text style={styles.rating}>Rating: {driverInfo.rating}</Text>

          {/* Profile Info */}
          <TouchableOpacity
            style={styles.infoSection}
            onPress={() => {
              /* Handle onPress for profile info */
            }}
          >
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Profile Info</Text>
              <Text style={styles.infoPlaceholder}>{driverInfo.drivingInfo}</Text>
            </View>
          </TouchableOpacity>

          {/* Vehicle Info */}
          <TouchableOpacity
            style={styles.infoSection}
            onPress={() => {
              /* Handle onPress for vehicle info */
            }}
          >
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Vehicle Info</Text>
              <Text style={styles.infoPlaceholder}>{driverInfo.assignedVehicles}</Text>
            </View>
          </TouchableOpacity>

          {/* Route Info */}
          <TouchableOpacity
            style={styles.infoSection}
            onPress={() => {
              /* Handle onPress for route info */
            }}
          >
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Route Info</Text>
              <Text style={styles.infoPlaceholder}>{driverInfo.routeInfo}</Text>
            </View>
          </TouchableOpacity>

        </View>
        
        
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleLogoutPress}
        >
          <Text style={styles.footerButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#004225',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  driverName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: '#4CAF50',
  },
  infoSection: {
    marginTop: 24,
    width: '100%', // Full width for consistency
  },
  infoItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoPlaceholder: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  footerButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#004225',
    marginTop: 12,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default DriverProfileScreen;