import { takeLatest } from 'redux-saga/effects';
import { putAction, putError, callApi } from '../utils';
import {
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
  MARK_TASK_AS_TRASH,
  MARK_TASK_AS_TRASH_SUCCESS,
  MARK_TASK_AS_TRASH_FAIL,
  USER_LOADED,
  SET_ERROR,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from '../actions';

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK, function*(action) {
    try {
      const response = yield callApi('createTask', action.payload);
      const { task } = response.data;
      yield putAction(CREATE_TASK_SUCCESS, task);
      action.payload.onSuccess();
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

export function* markTaskAsTrashSaga() {
  yield takeLatest(MARK_TASK_AS_TRASH, function*(action) {
    try {
      yield callApi('markTaskAsTrash', action.payload);
      yield putAction(MARK_TASK_AS_TRASH_SUCCESS, action.payload);
    } catch (error) {
      yield putError(MARK_TASK_AS_TRASH_FAIL, error);
    }
  });
}

export function* deleteTaskSaga() {
  yield takeLatest(DELETE_TASK, function*(action) {
    try {
      yield callApi('deleteTask', action.payload);
      yield putAction(DELETE_TASK_SUCCESS, action.payload);
    } catch (error) {
      yield putError(DELETE_TASK_FAIL, error);
    }
  });
}
