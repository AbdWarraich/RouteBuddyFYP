import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from './FormContext';
import PersonalInfo from './screens/PersonalInfo';
import VehicleInfo from './screens/VehicleInfo';
import RouteInfo from './screens/RouteInfo';
import { UserProvider } from '../context/UserContext';
import DrawerNavigation from './DrawerNavigation'; // Import your DrawerNavigation component

const Stack = createStackNavigator();

const AppNavigator = () => {
  useEffect(() => {
    try {
      // Example of handling Firebase Messaging here
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      messaging().getInitialNotification().then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NavigationContainer>
      <FormProvider>
        <UserProvider>
          <Stack.Navigator initialRouteName="PersonalInfo">
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
            <Stack.Screen name="RouteInfo" component={RouteInfo} />
          </Stack.Navigator>
        </UserProvider>
      </FormProvider>
      <DrawerNavigation /> {/* Make sure DrawerNavigation is correctly integrated */}
    </NavigationContainer>
  );
};

export default AppNavigator;
