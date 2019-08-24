import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import task from './taskReducer';
import error from './errorReducer';
import settings from './settingsReducer';

export default combineReducers({
  auth,
  user,
  task,
  error,
  settings,
});
