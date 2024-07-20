import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState("18");
  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleChooseImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); // Ensure to use the URI properly
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleNext = () => {
    // Validate inputs before navigating
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError('First Name should contain only alphabets');
      return;
    } else {
      setFirstNameError('');
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError('Last Name should contain only alphabets');
      return;
    } else {
      setLastNameError('');
    }

    if (!/^\d+$/.test(phoneNumber) || phoneNumber.length !== 11) {
      setPhoneNumberError('Valid 11-digit Phone Number is required');
      return;
    } else {
      setPhoneNumberError('');
    }

    if (!address.trim()) {
      setAddressError('Address is required');
      return;
    } else {
      setAddressError('');
    }

    // Navigate to the next screen with collected data
    navigation.navigate('vehicleinfo', {
      firstName,
      lastName,
      phoneNumber,
      address,
      age: selectedAge,
      licenseImageUri: imageUri, // Pass the selected image URI
    });
  };

  // Generate ages from 18 to 100
  const ages = [];
  for (let i = 18; i <= 100; i++) {
    ages.push(i.toString());
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('abd')}>
              <Icon name="user" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Personal</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Svg height="30" width="30">
            <Path
              d="M5 15 L25 15"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('vehicleinfo')}>
              <Icon name="car" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Vehicle</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Svg height="30" width="30">
            <Path
              d="M5 15 L25 15"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <TouchableOpacity style={styles.locationButton} onPress={() => navigation.navigate('Routeinfo')}>
              <Icon name="road" size={30} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.text}>Route</Text>
          </View>
        </View>
      </View>

      {/* Text Inputs */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.borderform}>
          {/* First Name and Last Name Input */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>First Name</Text>
              <TextInput
                style={[styles.input, firstNameError ? styles.inputError : null]}
                placeholder="First Name"
                onChangeText={text => setFirstName(text)}
              />
              {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
              <Text>Last Name</Text>
              <TextInput
                style={[styles.input, lastNameError ? styles.inputError : null]}
                placeholder="Last Name"
                onChangeText={text => setLastName(text)}
              />
              {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
            </View>
          </View>

          {/* Phone Number Input */}
          <View style={styles.phoneInputContainer}>
            <Text>Phone Number</Text>
            <TextInput
              style={[styles.input, phoneNumberError ? styles.inputError : null]}
              placeholder="Phone Number"
              onChangeText={text => setPhoneNumber(text)}
            />
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
          </View>

          {/* Address Input */}
          <View style={styles.phoneInputContainer}>
            <Text>Address</Text>
            <TextInput
              style={[styles.input, addressError ? styles.inputError : null]}
              placeholder="Address"
              onChangeText={text => setAddress(text)}
            />
            {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
          </View>

          {/* Age Picker */}
          <Text style={styles.label}>Select Your Age:</Text>
          <Picker
            selectedValue={selectedAge}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedAge(itemValue)
            }>
            {ages.map((age) => (
              <Picker.Item key={age} label={`${age}`} value={age} />
            ))}
          </Picker>

          <Text style={styles.label}>Choose License Image</Text>
          {/* Choose Image Button */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleChooseImage}>
              <Icon name="image" size={30} color="blue" />
            </TouchableOpacity>
            {imageUri && (
              <>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.selectedImage}
                />
                <Text style={styles.imageSelectedText}>Image selected</Text>
              </>
            )}
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
  },
  circle: {
    width: 63,
    height: 63,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#32a4a8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    lineHeight: 90,
  },
  text: {
    paddingTop: 19,
  },
  borderform: {
    flex: 1,
    borderWidth: 1,
    marginTop: 20,
    height: '100%',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  phoneInputContainer: {
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  label: {
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  imageSelectedText: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#32a4a8',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default PersonalInfo;
