import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ref, onValue } from 'firebase/database';
import { firebase } from '../firebase/firebaseConfig'; // Adjust import path as per your project structure
import { UserContext } from '../context/UserContext';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(UserContext);

  // Function to fetch notifications from Firebase
  useEffect(() => {
    const notificationsRef = ref(firebase.database(), 'notifications');

    // Listen for changes in notifications
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationsArray = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value,
          }))
          .filter((notification) => notification.requesterEmail === currentUser.email);
        setNotifications(notificationsArray.reverse()); // Reverse to show latest notifications first
      } else {
        setNotifications([]);
      }
    });
  }, [currentUser.email]);

  // Render item for FlatList
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <FontAwesome name="bell" size={24} color="#32a4a8" style={styles.notificationIcon} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Format timestamp to display time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  notificationList: {
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 16,
  },
  notificationTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default NotificationScreen;
