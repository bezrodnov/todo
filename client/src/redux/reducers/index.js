import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import task from './taskReducer';
import error from './errorReducer';

export default combineReducers({
  auth,
  user,
  task,
  error,
});
