import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RepositoriesScreen from './screens/RepositoriesScreen';
import TimeScreen from './screens/TimeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Repositories" component={RepositoriesScreen} />
        <Stack.Screen name="Time" component={TimeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;