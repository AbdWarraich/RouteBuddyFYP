import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig'; // Adjust import based on your project structure

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Assuming Firebase is set up with authentication
      const user = firebase.auth().currentUser;
      if (user) {
        const userData = {
          senderName: name,
          senderEmail: user.email,
          sentAt: new Date().toISOString(),
        };

        // Save request data to Firebase database under 'requests' node
        await firebase.database().ref('requests').push(userData);

        // Show alert that request is sent
        Alert.alert('Request Sent', `Request sent to user with email: ${user.email}`);

        // Navigate to 'Home' screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'User not authenticated');
      }
    } catch (error) {
      console.error('Error sending request:', error.message);
      Alert.alert('Error', 'Failed to send request. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signupText}>Payment Invoice</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/card.png')} style={styles.image} />
            <Image source={require('../assets/card.png')} style={styles.image} />
            <Image source={require('../assets/card.png')} style={styles.image} />
          </View>
          <Text style={styles.tex1}>Name On Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Name on card"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.tex1}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={email}
            onChangeText={setEmail}
            keyboardType="Card Number"
          />
          <Text style={styles.tex1}>Expire Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Expire Date"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.tex1}>Security Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Security Code"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32a4a8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center'
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  tex1: {
    //color:'Black',
  },
  input: {
    width: '90%',
    height: 40,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 15,
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 19,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default SignUp;
