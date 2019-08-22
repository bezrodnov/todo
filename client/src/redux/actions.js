export const LOAD_USER = 'LOAD_USER';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const generateAction = (type, payload = {}) => ({ type, payload });