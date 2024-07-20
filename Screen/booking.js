import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const BookingHistory = () => {
    const navigation = useNavigation();
  const [bookingHistory, setBookingHistory] = useState([]);

  // Function to fetch booking history data (mock implementation)
  const fetchBookingHistory = async () => {
    // Mock data for demonstration purposes
    const mockData = [
      { id: 1, date: '2024-03-25', time: '10:00 AM', pickup: '123 Main St', dropoff: '456 Elm St', fare: '$20' },
      { id: 2, date: '2024-03-24', time: '11:00 AM', pickup: '456 Elm St', dropoff: '789 Oak St', fare: '$25' },
      // Add more mock data as needed
    ];
    setBookingHistory(mockData);
  };

  useEffect(() => {
    fetchBookingHistory(); // Fetch booking history data when component mounts
  }, []);

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Pickup: {item.pickup}</Text>
      <Text>Drop-off: {item.dropoff}</Text>
      <Text>Fare: {item.fare}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking History</Text>
      <FlatList
        data={bookingHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

export default BookingHistory;
