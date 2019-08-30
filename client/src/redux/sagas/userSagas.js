import { takeLatest } from 'redux-saga/effects';
import { putAction, putError, callApi, setAuthToken } from '../utils';
import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_ERROR,
} from '../actions';

export function* updateUserSaga() {
  yield takeLatest(UPDATE_USER, function*(action) {
    try {
      const response = yield callApi('updateUser', action.payload);
      const { user } = response.data;
      yield putAction(UPDATE_USER_SUCCESS, user);
      action.payload.onSuccess();
    } catch (error) {
      yield putError(UPDATE_USER_FAIL, error);
    }
  });
}

export function* updateUserFailSaga() {
  yield takeLatest(UPDATE_USER_FAIL, function*(action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'UPDATE_USER_ERROR' });
    }
  });
}

export function* registerSaga() {
  yield takeLatest(REGISTER, function*(action) {
    try {
      const response = yield callApi('registerUser', action.payload);
      const { user, token } = response.data;
      setAuthToken(token);
      yield putAction(REGISTER_SUCCESS, { ...user, token });
    } catch (error) {
      yield putError(REGISTER_FAIL, error);
    }
  });
}

export function* registerFailSaga() {
  yield takeLatest(REGISTER_FAIL, function*(action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'REGISTER_ERROR' });
    }
  });
}
