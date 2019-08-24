export const LOAD_USER = 'LOAD_USER';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const SET_THEME = 'SET_THEME';

export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_FAIL = 'LOAD_TASKS_FAIL';

export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAIL = 'CREATE_TASK_FAIL';

export const MARK_TASK_AS_TRASH = 'MARK_TASK_AS_TRASH';
export const MARK_TASK_AS_TRASH_SUCCESS = 'MARK_TASK_AS_TRASH_SUCCESS';
export const MARK_TASK_AS_TRASH_FAIL = 'MARK_TASK_AS_TRASH_FAIL';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL';

export const generateAction = (type, payload = {}) => ({ type, payload });
