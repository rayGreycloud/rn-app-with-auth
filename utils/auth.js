import axios from 'axios';

import { BASE_AUTH_URL, API_KEY } from '../constants/firebase';

export const authenticateUser = async (email, password, mode) => {
  const url = `${BASE_AUTH_URL}:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true
  });
  // console.log(response);

  const token = response.data.idToken;

  return token;
};

export const createUser = async (email, password) => {
  const token = await authenticateUser(email, password, 'signUp');
  // console.log(token);

  return token;
};

export const logInUser = async (email, password) => {
  const token = await authenticateUser(email, password, 'signInWithPassword');
  // console.log(token);

  return token;
};
