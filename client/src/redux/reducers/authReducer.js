import {
  LOAD_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions';

import { getAuthToken } from '../utils';

const initialState = {
  token: getAuthToken(),
  isAuthenticated: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case REGISTER_FAIL:
      return {
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
