import { takeLatest } from 'redux-saga/effects';
import { putAction, putError, callApi } from '../utils';
import {
  SAVE_TASK,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAIL,
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

export function* saveTaskSaga() {
  yield takeLatest(SAVE_TASK, function*(action) {
    try {
      const response = yield callApi('saveTask', action.payload);
      const { task } = response.data;
      yield putAction(SAVE_TASK_SUCCESS, task);
      action.payload.onSuccess();
    } catch (error) {
      yield putError(SAVE_TASK_FAIL, error);
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

export function* loadTasksOnUserLoadSaga() {
  yield takeLatest(USER_LOADED, function*() {
    yield putAction(LOAD_TASKS);
  });
}

export function* markTaskAsTrashSaga() {
  yield takeLatest(MARK_TASK_AS_TRASH, function*(action) {
    try {
      yield callApi('markTaskAsTrash', action.payload.id);
      yield putAction(MARK_TASK_AS_TRASH_SUCCESS, action.payload.id);
      action.payload.onSuccess();
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
