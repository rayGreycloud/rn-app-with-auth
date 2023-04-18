import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getMessage } from '../utils/database';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const authCxt = useContext(AuthContext);
  const [message, setMessage] = useState('Loading...');

  const token = authCxt.token;

  useEffect(() => {
    getMessage(token)
      .then((result) => {
        setMessage(result.data);
      })
      .catch((error) => {
        console.log('WelcomeScreen/useEffect/error: ', error);
        setMessage('Error loading message.');
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  }
});
