import axios from 'axios';

const isAlive = () => axios.get('/api/auth/isalive');

const loadUser = () => axios.get('/api/auth/user');

const login = ({ email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  return axios.post('/api/auth', body, config);
};

export { isAlive, loadUser, login };
