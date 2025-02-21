import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RepositoriesScreen from './screens/RepositoriesScreen';
import TimeScreen from './screens/TimeScreen';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Repositories" component={RepositoriesScreen} />
        <Tab.Screen name="Time" component={TimeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;