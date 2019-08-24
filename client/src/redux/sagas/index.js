import { all } from 'redux-saga/effects';
import { loadUserSaga, loginSaga, authErrorSaga, logoutSaga } from './authSagas';
import { updateUserSaga, updateUserFailSaga, registerSaga, registerFailSaga } from './userSagas';
import {
  createTaskSaga,
  createTaskFailSaga,
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
    updateUserSaga(),
    updateUserFailSaga(),
    createTaskSaga(),
    createTaskFailSaga(),
    loadTasksSaga(),
    loadTasksFailSaga(),
    loadTasksOnUserLoadSaga(),
    markTaskAsTrashSaga(),
    deleteTaskSaga(),
  ]);
}
