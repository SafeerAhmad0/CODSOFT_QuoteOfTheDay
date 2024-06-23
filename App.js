import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home';
import SavedQuote from './src/Screens/SavesQuotes';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="SavedQuote" component={SavedQuote} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;



