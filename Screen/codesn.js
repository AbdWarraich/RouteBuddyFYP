import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp = () => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Here you can implement your sign-up logic
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Resetting the fields after sign-up
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Sign IN</Text>
        <Text style={styles.tex1}>Please provide your existing email</Text>
      </View>
      <View style={styles.formContainer}>
       
         
        <TextInput
          style={styles.input}
        />
         <TextInput
          style={styles.input}
        />
         <TextInput
          style={styles.input}
        />
         <TextInput
          style={styles.input}
        />
        

       
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Repass')}>
          <Text style={styles.buttonText}>Send Code</Text>
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
    flexDirection : 'row',
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
    width: '10%',
    height: 40,
   
   
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
   
   
  },
   button: {
    backgroundColor: '#32a4a8',
    //paddingVertical: 15,
    //borderRadius: 5,
     borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
     width: '30%',
     height: 70,
     marginTop: 200,
     justifyContent: 'ceneter'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop:20,
    fontWeight: 'bold',
  },

});

export default SignUp;