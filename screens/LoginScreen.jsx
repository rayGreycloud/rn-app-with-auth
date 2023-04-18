import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { logInUser } from '../utils/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const authCxt = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const logInHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true);
      const result = await logInUser(email, password);

      authCxt.authenticate(result);
      console.log('Log in successful!');
    } catch (err) {
      console.log('logInHandler/error: ', err);
      Alert.alert('Authentication failed!', 'Invalid email or password.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating)
    return <LoadingOverlay message={'Logging user in...'} />;

  return <AuthContent isLogin onAuthenticate={logInHandler} />;
}

export default LoginScreen;
