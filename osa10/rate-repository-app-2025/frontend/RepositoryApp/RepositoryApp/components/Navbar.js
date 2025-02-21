import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Repositories" onPress={() => navigation.navigate('Repositories')} />
      <Button title="Time" onPress={() => navigation.navigate('Time')} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
});

export default Navbar;