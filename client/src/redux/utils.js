import axios from 'axios';
import { put, call } from 'redux-saga/effects';

import { generateAction, SET_ERROR } from './actions';
import * as api from '../api';

// TODO: update token before moving to prod
const AUTH_TOKEN_STORAGE_KEY = 'ABEZRODNOV_BLOG_AUTH_TOKEN';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const setAuthToken = token => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
  setRequestHeaderAuthToken(token);
};

export const setRequestHeaderAuthToken = token => {
  axios.defaults.headers.common['x-auth-token'] = token;
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;
};

export const putAction = (action, payload) => put(generateAction(action, payload));

export const putError = function*(action, error) {
  const message = error.response && error.response.data.message;
  yield putAction(action, message && { message });
  if (message) {
    yield putAction(SET_ERROR, { message, id: action });
  }
};

export const callApi = (method, ...args) => call(api[method], ...args);

export const delay = ms => new Promise(res => setTimeout(res, ms));
