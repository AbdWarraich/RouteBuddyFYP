import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const Account = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.uid);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userRef = firebase.database().ref(`users/${uid}`);
      const snapshot = await userRef.once('value');
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("User data fetched: ", data); // Debugging line
        setUserData(data);
      } else {
        console.log("No user data found for uid: ", uid); // Debugging line
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('UserInfo');
  };

  const handleBecomeDriver = () => {
    navigation.navigate('DriverHome');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
        <FontAwesome name="bars" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEditProfile} style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={require('../assets/abb.jpeg')}
            />
          </View>
          <View>
            <Text style={styles.name}>
              {userData ? `${userData.firstName} ${userData.lastName}` : 'Name'}
            </Text>
            <Text style={styles.email}>{user ? user.email : 'Email'}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleBecomeDriver}>
          <OptionItem icon="car" label="Become a Driver" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('personalInfo')}>
          <OptionItem icon="exclamation-triangle" label="Post a Complaint" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('booking')}>
          <OptionItem icon="history" label="View History" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('driveLoc')}>
          <OptionItem icon="map-marker" label="Driver Location" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {
        firebase.auth().signOut().then(() => {
          navigation.navigate('SignIn');
        }).catch((error) => {
          console.error("Error signing out: ", error);
        });
      }}>
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
