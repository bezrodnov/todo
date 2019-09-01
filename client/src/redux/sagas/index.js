import { all } from 'redux-saga/effects';
import { loadUserSaga, loginSaga, authErrorSaga, logoutSaga, checkSessionSaga } from './authSagas';
import { updateUserSaga, updateUserFailSaga, registerSaga, registerFailSaga } from './userSagas';
import {
  saveTaskSaga,
  saveTaskFailSaga,
  loadTasksSaga,
  loadTasksFailSaga,
  loadTasksOnUserLoadSaga,
  markTaskAsTrashSaga,
  deleteTaskSaga,
} from './taskSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    authErrorSaga(),
    loginSaga(),
    registerSaga(),
    registerFailSaga(),
    logoutSaga(),
    checkSessionSaga(),
    updateUserSaga(),
    updateUserFailSaga(),
    saveTaskSaga(),
    saveTaskFailSaga(),
    loadTasksSaga(),
    loadTasksFailSaga(),
    loadTasksOnUserLoadSaga(),
    markTaskAsTrashSaga(),
    deleteTaskSaga(),
  ]);
}
