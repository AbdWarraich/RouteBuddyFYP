import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig'; // Ensure firebase is imported correctly

const Complain = () => {
  const [complaint, setComplaint] = useState('');
  const [subject, setSubject] = useState('Choose type');
  const navigation = useNavigation();

  const handleSubmitComplaint = async () => {
    if (!complaint.trim()) {
      Alert.alert('Please enter your complaint.');
      return;
    }

    try {
      const database = firebase.database();
      const newComplaintRef = database.ref('complaints').push();
      const timestamp = Date.now();

      await newComplaintRef.set({
        subject,
        complaint,
        timestamp,
      });

      Alert.alert('Thank you!', 'Your complaint has been submitted.');
      setComplaint(''); // Clear the complaint text after submission
      setSubject('Choose type'); // Reset subject selection
    } catch (error) {
      console.error("Error submitting complaint: ", error);
      Alert.alert('Error', 'Failed to submit complaint. Please try again later.');
    }
  };

  const handleSubjectChange = (itemValue) => {
    setSubject(itemValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>File a Complaint</Text>

        <Text style={styles.label}>Select Subject</Text>
        <Picker
          selectedValue={subject}
          onValueChange={handleSubjectChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Choose type" value="Choose type" />
          <Picker.Item label="Abusive Behavior" value="Abusive Behavior" />
          <Picker.Item label="Service Issue" value="Service Issue" />
          <Picker.Item label="Technical Problem" value="Technical Problem" />
          <Picker.Item label="Others" value="Others" />
        </Picker>

        <Text style={styles.label}>Describe Your Complaint:</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Enter your complaint here"
          value={complaint}
          onChangeText={text => setComplaint(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmitComplaint}>
          <Text style={styles.buttonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  picker: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333', // Dark text color for picker
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Complain;
