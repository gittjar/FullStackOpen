import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';


const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
  },
});

const Home = ({ navigation }) => {
  const { data } = useQuery(ME);

  return (
    <View style={styles.container}>
      {data && data.me ? (
        <Text style={styles.text}>Welcome, {data.me.username}! Your userId: {data.me.id}
        </Text>
        
      ) : (
        <Text style={styles.text}>Welcome to the Home Page!</Text>
      )}
      <View style={styles.button}>
        <Button
          title="Go to Repositories"
          onPress={() => navigation.navigate('RepositoryList')}
        />


      </View>

    </View>
  );
};

export default Home;