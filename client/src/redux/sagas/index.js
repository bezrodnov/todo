import { all } from 'redux-saga/effects';
import { loadUserSaga, loginSaga, authErrorSaga, logoutSaga } from './authSagas';
import { updateUserSaga, updateFailSaga, registerSaga, registerFailSaga } from './userSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    authErrorSaga(),
    loginSaga(),
    registerSaga(),
    registerFailSaga(),
    logoutSaga(),
    updateUserSaga(),
    updateFailSaga(),
  ]);
}
