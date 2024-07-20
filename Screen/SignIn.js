import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState ,useContext} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import {UserContext} from '../context/UserContext'

const SignIn = () => {

  const {setCurrentUser} = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignIn = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Check if email is provided
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError('Email is invalid');
      return;
    }

    // Check if password is provided
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in:', userCredential.user.uid);
      setCurrentUser(userCredential.user);
      // Store user auth data in AsyncStorage
      await AsyncStorage.setItem('userToken', userCredential.user.uid);

      // Reset fields after sign-in
      setEmail('');
      setPassword('');

      // Navigate to home screen upon successful sign-in
      navigation.navigate('Tab');
    } catch (error) {
      console.error('Sign-in error:', error.message);
      // Handle sign-in error here
      if (error.code === 'auth/wrong-password') {
        // If the error is due to incorrect password, set an error message for password
        setPasswordError('Password is incorrect');
      } else if (error.code === 'auth/user-not-found') {
        // If the error is due to user not found, set an error message for email
        setEmailError('User not found. Please sign up.');
      } else {
        // For other errors, show a generic error message
        alert('Error signing in. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subHeading}>Please sign in to get started</Text>
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
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('Forget')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#32a4a8',
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
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#32a4a8',
    marginLeft: 5,
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

export default SignIn;