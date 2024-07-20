import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import TopUpNavigation from './Navigation/TopUpnavigation';


export default function App() {
  return (
   
      <NavigationContainer>
        <TopUpNavigation />
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
