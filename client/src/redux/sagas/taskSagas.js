import { takeLatest } from 'redux-saga/effects';
import { putAction, putError, callApi } from '../utils';
import {
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
  USER_LOADED,
  SET_ERROR,
} from '../actions';

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK, function*(action) {
    try {
      const response = yield callApi('createTask', action.payload);
      const { task } = response.data;
      yield putAction(CREATE_TASK_SUCCESS, task);
    } catch (error) {
      yield putError(CREATE_TASK_FAIL, error);
    }
  });
}

export function* createTaskFailSaga() {
  yield takeLatest(CREATE_TASK_FAIL, function*(action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'CREATE_TASK_ERROR' });
    }
  });
}

export function* loadTasksSaga() {
  yield takeLatest(LOAD_TASKS, function*() {
    try {
      const response = yield callApi('loadTasks');
      const tasks = response.data;
      yield putAction(LOAD_TASKS_SUCCESS, { tasks });
    } catch (error) {
      yield putError(LOAD_TASKS_FAIL, error);
    }
  });
}

export function* loadTasksFailSaga() {
  yield takeLatest(LOAD_TASKS_FAIL, function*(action) {
    const { message } = action.payload;
    if (message) {
      yield putAction(SET_ERROR, { message, id: 'LOAD_TASKS_ERROR' });
    }
  });
}

export function* loadTasksOnUserLoadSaga() {
  yield takeLatest(USER_LOADED, function*() {
    yield putAction(LOAD_TASKS);
  });
}
