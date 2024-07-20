import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue, remove } from 'firebase/database';
import { firebase } from '../firebase/firebaseConfig'; // Adjust import path as per your project structure
import { UserContext } from '../context/UserContext';

const NotificationReceiverScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications from Firebase
  useEffect(() => {
    const notificationsRef = ref(firebase.database(), 'notifications');

    // Listen for changes in notifications
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationsArray = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value,
          }))
          .filter((notification) => notification.requesterEmail === currentUser.email); // Filter notifications for current user
        setNotifications(notificationsArray.reverse()); // Reverse to show latest notifications first
      } else {
        setNotifications([]);
      }
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, [currentUser.email]);

  // Function to handle accepting a request
  const handleAcceptRequest = (notificationId) => {
    // Implement your logic to handle accepting the request
    Alert.alert('Request Accepted', `You have accepted the request.`);
    // Remove the notification from Firebase
    remove(ref(firebase.database(), `notifications/${notificationId}`));
  };

  // Function to handle declining a request
  const handleDeclineRequest = (notificationId) => {
    // Implement your logic to handle declining the request
    Alert.alert('Request Declined', `You have declined the request.`);
    // Remove the notification from Firebase
    remove(ref(firebase.database(), `notifications/${notificationId}`));
  };

  // Render each notification item
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAcceptRequest(item.id)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDeclineRequest(item.id)}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  notificationItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#32a4a8',
  },
  declineButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default NotificationReceiverScreen;
