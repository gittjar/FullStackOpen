import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import Config from '../components/Config';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${Config.baseURL}/login`, { username, password });
      if (response.status === 200 && response.data.accessToken) {
        const { accessToken } = response.data;
        setMessage('Login OK!');
        console.log('Token received:', accessToken); // Log the token
        navigation.navigate('Home', { token: accessToken });
      } else {
        setMessage('Login failed: Invalid username or password');
      }
    } catch (error) {
      setMessage('Login failed: Invalid username or password');
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </Pressable>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#0366d6',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: 320,
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
    overflow: 'hidden',
    width: 320,
  },
  message: {
    marginTop: 10,
    color: 'navy',
  },
});

export default LoginScreen;