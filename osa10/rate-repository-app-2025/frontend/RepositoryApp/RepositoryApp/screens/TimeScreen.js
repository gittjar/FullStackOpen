import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const TimeScreen = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get('http://localhost:4000/time');
        setTime(response.data);
      } catch (error) {
        console.error('Failed to fetch time', error);
      }
    };

    fetchTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Local Time</Text>
      <Text>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeScreen;