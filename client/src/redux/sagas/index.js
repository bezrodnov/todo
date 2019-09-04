import { all } from 'redux-saga/effects';
import { loadUserSaga, loginSaga, logoutSaga, checkSessionSaga } from './authSagas';
import { updateUserSaga, registerSaga } from './userSagas';
import { saveTaskSaga, loadTasksSaga, loadTasksOnUserLoadSaga, markTaskAsTrashSaga, deleteTaskSaga } from './taskSagas';

export default function* saga() {
  yield all([
    loadUserSaga(),
    loginSaga(),
    registerSaga(),
    logoutSaga(),
    checkSessionSaga(),
    updateUserSaga(),
    saveTaskSaga(),
    loadTasksSaga(),
    loadTasksOnUserLoadSaga(),
    markTaskAsTrashSaga(),
    deleteTaskSaga(),
  ]);
}
