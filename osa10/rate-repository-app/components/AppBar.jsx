import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#050E56',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
    paddingLeft: 80,
    fontWeight: 'bold',
  },
  link: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 80,
  },
  linkHover: {
    color: '#C0C0C0',
    fontSize: 18,
    paddingLeft: 80,
  },
  teksti: {
    color: 'white',
    fontSize: 12,
    paddingLeft: 80,
  },
});

const HoverableLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text style={isHovered ? styles.linkHover : styles.link}>
        {children}
      </Text>
    </Link>
  );
};

const SignOutTab = ({ onSignOut }) => {
  const client = useApolloClient();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await client.resetStore();
    onSignOut();
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text style={styles.link}>Sign Out</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { data, loading, refetch } = useQuery(ME, { fetchPolicy: 'network-only' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data && data.me) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    refetch();
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Text style={styles.teksti}>Part 10 - by gittjar - 2024</Text>
      <Text style={styles.title}>Repositories</Text>
      <ScrollView horizontal>
        {isLoggedIn ? (
          <>
            <Text style={styles.link}>Hello, {data.me.username} you're logged in now!</Text>
            <SignOutTab onSignOut={handleSignOut} />
            <HoverableLink to="/home">Home</HoverableLink>
          </>
        ) : (
          <HoverableLink to="/signin">Sign In</HoverableLink>
        )}
        <HoverableLink to="/">Repositories</HoverableLink>
        <HoverableLink to="/test">Test</HoverableLink>
      </ScrollView>
    </View>
  );
};

export default AppBar;