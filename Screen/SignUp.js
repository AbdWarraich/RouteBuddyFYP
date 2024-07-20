import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const handleSignUp = async () => {
    // Reset error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Re-Type Password is required');
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password must match');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Store user data in Firebase Realtime Database
      const userRef = firebase.database().ref(`users/${userId}`);
      await userRef.set({
        name,
        email,
      });

      console.log('User data stored in Realtime Database:', userRef);

      await AsyncStorage.setItem('userToken', userId);

      // Reset fields after sign-up
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navigate to sign-in screen upon successful sign-up
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Sign-up error:', error.message);
      // Display error message
      setNameError('Failed to sign up. Please try again later.');
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subHeading}>Please sign up to get started</Text>
        <TextInput
          style={[styles.input, nameError && styles.errorInput]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={[styles.input, passwordError && styles.errorInput, styles.passwordContainer]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} // Hide password if visibility is false
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
          >
            <Text>
              {passwordVisible ? '👁️' : '👁️'}
            </Text>
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TextInput
          style={[styles.input, confirmPasswordError && styles.errorInput]}
          placeholder="Re-Type Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!passwordVisible} // Hide password if visibility is false
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.bottomText, { color: '#32a4a8' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#32a4a8',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  bottomText: {
    color: '#666',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 10,
  },
});

export default SignUp;
