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

const initialState = {
  user: null,
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
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case REGISTER_FAIL:
      return {
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
