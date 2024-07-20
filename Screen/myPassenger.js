import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window'); // Define width here

const YourComponent = () => {
    const navigation = useNavigation();


  return (
     <View style={styles.container}>
    
      
      <View style={styles.imageRow}>
     
  <Image source={require('../assets/acc.jpeg')} style={styles.image} />
  
  <View style={styles.labelContainerLeft}>
  
      <Text>Abdullah</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>

  </View>
  <View style={styles.labelContainerRight}>
   
  </View>
</View>
<View style={styles.imageRow}>

  <Image source={require('../assets/abb.jpeg')} style={styles.image} />
 
  <View style={styles.labelContainerLeft}>
   
      <Text>Hunain</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>
   
  </View>
  <View style={styles.labelContainerRight}>
   
  </View>
</View>
<View style={styles.imageRow}>

  <Image source={require('../assets/aaa.jpeg')} style={styles.image} />
 
  <View style={styles.labelContainerLeft}>
    
      <Text>Hassan </Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>

  </View>
  <View style={styles.labelContainerRight}>
    
  </View>
</View>
<View style={styles.imageRow}>

  <Image source={require('../assets/acc.jpeg')} style={styles.image} />
 
  <View style={styles.labelContainerLeft}>
   
      <Text>Moeez</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>
   
  </View>

  
  <View style={styles.labelContainerRight}>
    
  </View>
</View>

<View style={styles.imageRow}>

  <Image source={require('../assets/acc.jpeg')} style={styles.image} />
  
  <View style={styles.labelContainerLeft}>
   
      <Text>Moeez</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>
    
  </View>

  
  <View style={styles.labelContainerRight}>
    
  </View>
</View>

<View style={styles.imageRow}>

  <Image source={require('../assets/acc.jpeg')} style={styles.image} />
 
  <View style={styles.labelContainerLeft}>
   
      <Text>Moeez</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>
   
  </View>

  
  <View style={styles.labelContainerRight}>
    
  </View>
</View>
<View style={styles.imageRow}>

  <Image source={require('../assets/acc.jpeg')} style={styles.image} />
  
  <View style={styles.labelContainerLeft}>
    
      <Text>Moeez</Text>
      <Text style={styles.emailText}>201400027@gift.edu.pk</Text>
   
  </View>

  
  <View style={styles.labelContainerRight}>
    
  </View>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    width: 200,
  },
  searchcTex:{
   // marginTop: -30,
    width: '80%',
    //marginBottom: 20,
    marginLeft:100,
    fontSize: 20, 
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pickerContainer: {
    width: width * 0.33, // Adjust the percentage as needed
    borderWidth: 1,
    height: 50,
    borderColor: 'grey',
    borderRadius: 20,
   // overflow: 'hidden', // Ensure the picker is not clipped by its container
    //marginBottom: 20,
  },
  picker: {
    fontSize: 6, // Adjust the font size as needed
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  labelContainerLeft: {
    alignItems: 'flex-start', // align items to the left
    flex: 1, // take up remaining space
    paddingHorizontal: 20,
  },
  labelContainerRight: {
    alignItems: 'flex-end', // align items to the right
    flex: 1, // take up remaining space
    paddingHorizontal: 20,
  },
});

export default YourComponent;
