import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { onValue, push, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { firebase } from '../firebase/firebaseConfig'; // Adjust import path as per your project structure

const Driver = ({ route }) => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [chatId, setChatId] = useState(null);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const currentUserId = currentUser.uid;
  const currentUserName = currentUser.displayName || currentUser.email; // Adjust according to your user data structure
  const { driverData } = route.params || {};

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const chatsRef = ref(firebase.database(), 'chats');
        onValue(chatsRef, (snapshot) => {
          const chatsData = snapshot.val();
          let existingChatId = null;

          for (const chatKey in chatsData) {
            const chat = chatsData[chatKey];
            setChat(chat);
            if (chat.users[currentUserId] && chat.users[driverData?.id]) {
              existingChatId = chatKey;
              break;
            }
          }

          if (existingChatId) {
            setChatId(existingChatId);
          } else {
            const newChatRef = push(chatsRef);
            set(newChatRef, {
              users: {
                [currentUserId]: true,
                [driverData.id]: true,
              },
              messages: {},
            }).then(() => {
              setChatId(newChatRef.key); // Use newChatRef.key to set chatId
            });
          }

          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching chat ID:', error.message);
        setLoading(false); // Ensure loading state is updated on error
      }
    };

    if (currentUser && driverData) {
      fetchChatId();
    }
  }, [currentUserId, driverData?.id, currentUser]);

  if (!driverData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Driver data not provided.</Text>
      </View>
    );
  }

  // Example driver data (replace with actual Firebase data retrieval)
  const driver = {
    name: `${driverData?.firstName} ${driverData?.lastName}`,
    number: '0336-1400373', // Replace with actual driver number
    profilePic: require('../assets/a.jpg'), // Replace with actual profile picture URL
    vehiclePics: [
      require('../assets/van3.jpeg'), // Replace with actual vehicle picture URLs
      require('../assets/van2.jpeg'),
    ],
    id: driverData?.id, // Replace with actual driver ID from Firebase
    email: 'abdullah@example.com', // Replace with actual driver email
  };

  const handleRequest = async () => {
    try {
      const notificationsRef = ref(firebase.database(), 'notifications');
      const newNotificationRef = push(notificationsRef);

      const notificationData = {
        requesterEmail: currentUser?.email || '', // Handle cases where currentUser.email might be undefined
        driverName: driver?.name,
        title: 'New Request',
        message: `You have received a new request from ${currentUser?.email || ''} for driver ${driver?.name}.`,
        timestamp: Date.now(),
      };

      await set(newNotificationRef, notificationData);

      Alert.alert('Request Sent', `Your request has been sent to ${driver?.name}.`, [
        { text: 'OK', onPress: () => navigation.navigate('NotificationScreen') }
      ]);
    } catch (error) {
      console.error('Error sending request:', error.message);
      Alert.alert('Error', 'Failed to send request. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={driver.profilePic} style={styles.profilePicture} />
        <Text style={styles.name}>{driver.name}</Text>
        <Text style={styles.number}>{driver.number}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Message', {
          chatId: chatId,
          driverId: driver?.id,
          userId: currentUserId,
          userName: currentUserName,
          chatData: chat
        })}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('feedback', { driverId: driver?.id })}>
          <FontAwesome name="star" size={24} color="black" />
          <Text style={styles.optionLabel}>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Availability')}>
          <FontAwesome name="calendar" size={24} color="black" />
          <Text style={styles.optionLabel}>Availability</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Location')}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text style={styles.optionLabel}>Location</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Vehicle</Text>
      <View style={styles.vehicleContainer}>
        {driver.vehiclePics.map((vehiclePic, index) => (
          <Image key={index} style={styles.vehiclePicture} source={vehiclePic} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  number: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
  },
  option: {
    alignItems: 'center',
  },
  optionLabel: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vehiclePicture: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Driver;
