import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import theme from '../components/theme';
import Config from '../components/Config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFE',
    alignItems: 'center', // Center items horizontally
  },
  card: {
    backgroundColor: 'white',
    width: '100%', // Adjust width to a percentage
    maxWidth: 600, // Set a max width for larger screens
    padding: 15,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    border: '1px solid black',
    fontFamily: theme.fonts.main,
  },
  separator: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    marginLeft: 10,
  },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  count: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count;
};

const RepositoriesScreen = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/repositories`); // Use Config.baseURL
        setRepositories(response.data);
      } catch (error) {
        console.error('Failed to fetch repositories', error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
              <View style={styles.details}>
                <Text style={styles.fullName}>{item.fullName}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.language}>{item.language}</Text>
              </View>
            </View>
            <View style={styles.counts}>
              <Text style={styles.count}>{formatCount(item.forksCount)} Forks</Text>
              <Text style={styles.count}>{formatCount(item.stargazersCount)} Stars</Text>
              <Text style={styles.count}>{formatCount(item.ratingAverage)} Rating</Text>
              <Text style={styles.count}>{formatCount(item.reviewCount)} Reviews</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default RepositoriesScreen;