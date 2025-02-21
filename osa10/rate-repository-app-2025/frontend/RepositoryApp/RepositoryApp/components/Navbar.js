import React, { useContext, useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const Navbar = ({ navigation }) => {
  const authStorage = useContext(AuthStorageContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await authStorage.getAccessToken();
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, [authStorage]);

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navbar}>
      {isLoggedIn ? (
        <>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      )}
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