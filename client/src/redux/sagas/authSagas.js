import { takeLatest } from 'redux-saga/effects';
import { putAction, putError, callApi, getAuthToken, setAuthToken, setRequestHeaderAuthToken } from '../utils';
import { LOAD_USER, USER_LOADED, AUTH_ERROR, LOGIN, LOGIN_SUCCESS, LOGOUT, SET_ERROR } from '../actions';

export function* loadUserSaga() {
  yield takeLatest(LOAD_USER, function*() {
    try {
      const token = getAuthToken();
      if (!token) {
        // if there is no token - skip further requests to the server
        yield putAction(AUTH_ERROR);
        return;
      }

      setRequestHeaderAuthToken(token);
      const response = yield callApi('loadUser');
      const user = response.data;
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      // failed to load user - which means authentication is required
      // perform sign out to clear token and force user to sign in
      yield putAction(LOGOUT);
    }
  });
}

export function* authErrorSaga() {
  yield takeLatest(AUTH_ERROR, function*(action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'AUTH_ERROR' });
    }
  });
}

export function* loginSaga() {
  yield takeLatest(LOGIN, function*(action) {
    try {
      const response = yield callApi('login', action.payload);
      const { user, token } = response.data;
      setAuthToken(token);
      yield putAction(LOGIN_SUCCESS);
      yield putAction(USER_LOADED, { ...user, token });
    } catch (error) {
      yield putError(AUTH_ERROR, error);
    }
  });
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT, function*(action) {
    yield setAuthToken();
  });
}
