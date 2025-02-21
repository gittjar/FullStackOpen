import React, { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStorageContext = createContext();

export const AuthStorageProvider = ({ children }) => {
  const getAccessToken = async () => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (e) {
      console.error('Failed to fetch the access token', e);
      return null;
    }
  };

  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      console.error('Failed to remove the access token', e);
    }
  };

  return (
    <AuthStorageContext.Provider value={{ getAccessToken, removeAccessToken }}>
      {children}
    </AuthStorageContext.Provider>
  );
};

export default AuthStorageContext;