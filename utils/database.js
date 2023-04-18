import axios from 'axios';

import { BASE_DATABASE_URL } from '../constants/firebase';

export const getMessage = async (token) => {
  const url = `${BASE_DATABASE_URL}/message.json?auth=${token}`;

  const response = await axios.get(url);
  // console.log(response);

  return response;
};
