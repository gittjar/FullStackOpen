import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // access token
    const rawToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return rawToken ? JSON.parse(rawToken) : [];
  }

  async setAccessToken(accessToken) {
    // lisää access token storageen
    await AsyncStorage.setItem(`${this.namespace}:token`, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    // poista access token storagesta
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;