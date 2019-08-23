import axios from 'axios';

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

export { loadUser, login };
