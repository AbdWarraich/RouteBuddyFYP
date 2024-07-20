import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText} onPress={() => navigation.navigate('myPassenger')}>Passenger</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText} onPress={() => navigation.navigate('myPassenger')}>Pending Requests</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText} onPress={() => navigation.navigate('feedback')}>Feedback</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Fourth Box</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,    
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#32a4a8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
