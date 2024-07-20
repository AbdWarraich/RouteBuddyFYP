import { useNavigation } from '@react-navigation/native';
import { child, get, getDatabase, ref } from "firebase/database";
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const Forget = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSendEmail = async () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if email is valid
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const userSnapshot = await get(child(ref(getDatabase()), `users`));
      const users = userSnapshot.val();
      
      for (const key in users) {
        const userEmail = users[key].email
        const e = userEmail
       
        if (userEmail.toLowerCase() === email.toLowerCase()) {
          await firebase.auth().sendPasswordResetEmail(email);
          setResetMessage('Password reset email sent. Please check your inbox.');
          Alert.alert('Message', 'Link Sent Successfully '+email);
          return;
        }
      }
      Alert.alert('Message', 'Email not Found');
      setEmail('');
    } catch (error) {
      console.error('Error sending reset email:', error.message);
      setResetMessage('Error sending reset email. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Forgot Password</Text>
        
      </View>
      <View style={styles.formContainer}>
      <Text style={styles.subHeading}>Please provide your existing email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {resetMessage ? <Text style={styles.resetMessage}>{resetMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32a4a8',
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeading: {
    fontSize: 16,
    color: 'black',
    padding: 10,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  tex1: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetMessage: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Forget;