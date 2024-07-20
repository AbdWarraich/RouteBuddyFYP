import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TwoTextInOneBorder = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.border2}>
        <Text style={styles.text1}>Seats</Text>  
      </View>
      <View style={styles.border}>
        <Text style={styles.text}
         placeholder="Available Seats">Available Seats : 5</Text>  
      </View>
      <View style={styles.border}>
       
        <Text style={styles.text}
         placeholder="reserved Seats">reserved Seats: 5</Text>
      </View>

      <View style={styles.border1}>
        <Text style={styles.text1}>Time</Text>  
      </View>
      <View style={styles.border}>
        <Text style={styles.text}
        placeholder="Departure Time">Departure Time: 9am</Text>  
      </View>
      <View style={styles.border}>
       
        <Text style={styles.text}
        placeholder="Arrival Time">Arrival Time: 2pm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop:80,
  },
  border: {
    borderWidth: 1,
    
    borderColor: '#ccc',
    borderRadius: 5,
    width:'80%',
    padding: 10,
  },
  text: {
    fontSize: 16,
    //textAlign: 'center',
  },
  text1: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',

  },

  border1: {
    borderWidth: 1,
    backgroundColor: '#32a4a8',
    borderColor: '#ccc',
    borderRadius: 5,
    width:'80%',
    padding: 10,
    marginTop:50
  },
  border2: {
    borderWidth: 1,
    backgroundColor: '#32a4a8',
    borderColor: '#ccc',
    borderRadius: 5,
    width:'80%',
    padding: 10,
    
  },
});

export default TwoTextInOneBorder;
