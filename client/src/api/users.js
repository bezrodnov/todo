import axios from 'axios';

const sendJSON = (payload, path) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(payload);
  return axios.post(`/api/users/${path}`, body, config);
};

const registerUser = user => sendJSON(user, 'register');
const updateUser = user => sendJSON(user, 'update');

export { registerUser, updateUser };
