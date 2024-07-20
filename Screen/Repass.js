import React, { useState } from 'react';
import { View, TextInput,TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   

  const handleSignIn = () => {
    // Here you can implement your sign-up logic
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Resetting the fields after sign-up
    setName('');
    setEmail('');
    setPassword('');
    navigation.navigate('Tab')
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Reset  Password</Text>
        <Text style={styles.tex1}>Please Reset TO get started</Text>
      </View>
      <View style={styles.formContainer}>
       
         <Text style={styles.tex1}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
         <Text style={styles.tex1}>Re-Type Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-Type Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
     
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')} >
          <Text style={styles.buttonText}>Reset</Text>
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
    paddingHorizontal: 20,
    backgroundColor: '#32a4a8',  
  },
  signupContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {  
    flex: 1,
    width: '115%',
     borderTopLeftRadius: 55,
      borderTopRightRadius: 55,
    backgroundColor: 'black',
    paddingVertical: 55,
    paddingHorizontal: 25,
  },

  tex1: {
    color:'white',
  },
  input: {
    width: '90%',
    height: 40,
    marginTop:20,
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomContainer1: {
    flexDirection: 'row',
    justifyContent: 'right',
    marginTop: 10,
    marginLeft: 220,
    marginBottom:20,
  },
  bottomText: {
    color: 'white',
    marginRight: 5,
  },

});

export default SignIn;
