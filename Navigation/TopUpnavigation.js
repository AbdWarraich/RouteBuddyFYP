// TopUpnavigation.js

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Complain from '../Screen/Complain';
import Driver from '../Screen/Driver';
import DriverHome from '../Screen/DriverHome';
import DriverPortfolio from '../Screen/DriverPortfolio';
import Forget from '../Screen/Forget';
import Location from '../Screen/Location';
import Map from '../Screen/Map';
import Message from '../Screen/Message';
import personalInfo from '../Screen/PersonalInfo';
import Repass from '../Screen/Repass';
import Routeinfo from '../Screen/Routeinfo';
import SignIn from '../Screen/SignIn';
import SignUp from '../Screen/SignUp';
import MyProfile from '../Screen/MyProfile';
import vehicleinfo from '../Screen/Vehicleinfo';
import booking from '../Screen/booking';
import codesn from '../Screen/codesn';
import driveLoc from '../Screen/driveLoc';
import driverprofile from '../Screen/driverprofile';
import feedback from '../Screen/feedback';
import myPassenger from '../Screen/myPassenger';
import payment from '../Screen/payment';
import seats from '../Screen/seats';
import BottomUpNavigation from './BottomUpNavigation';
// import DrawerNavigation from './DrawerNavigation';
import DriverHomeNavigation from './DriverHomeNavigation';
import { UserProvider } from '../context/UserContext';
const Stack = createStackNavigator();

const TopUpNavigation = () => {
  return (
    <UserProvider>
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Complain" component={Complain} options={{ headerShown: true }} />
      <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
      <Stack.Screen name="vehicleinfo" component={vehicleinfo} />
      <Stack.Screen name="DriverHome" component={DriverHomeNavigation} options={{ headerShown: false }}/>
      <Stack.Screen name="DriverPortfolio" component={DriverPortfolio} />
      <Stack.Screen name="myPassenger" component={myPassenger} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="driveLoc" component={driveLoc} />
      <Stack.Screen name="booking" component={booking} />
      <Stack.Screen name="driverproile" component={driverprofile} />
     
      <Stack.Screen name="seats" component={seats} />
      <Stack.Screen name="Routeinfo" component={Routeinfo} />
      <Stack.Screen name="personalInfo" component={personalInfo} />
      <Stack.Screen name="feedback" component={feedback} options={{ title: 'Feedback' }} />
      
      <Stack.Screen name="Repass" component={Repass} options={{ headerShown: false }} />
      <Stack.Screen name="codesn" component={codesn} options={{ headerShown: false }} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="payment" component={payment} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Driver" component={Driver} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={BottomUpNavigation} options={{ headerShown: false }} />
      
    </Stack.Navigator>
    </UserProvider>
  );
};

export default TopUpNavigation;
