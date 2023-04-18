import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { createUser } from '../utils/auth';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authCxt = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true);
      const result = await createUser(email, password);
      console.log('signupHandler/result: ', result);
      authCxt.authenticate(result);
    } catch (err) {
      console.log('signupHandler/error: ', err);
      Alert.alert('Sign up failed!', 'Could not create user.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message={'Creating user...'} />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
