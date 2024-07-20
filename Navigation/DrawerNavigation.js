// DrawerNavigation.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Account from '../Screen/Account';
import Settings from '../Screen/Settings';
import Route from '../Screen/Route';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Account">
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Route" component={Route} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
