import {
  LOGIN_SUCCESS,
  LOGOUT,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
} from '../actions';

const initialState = {
  isCreatingTask: false,
  isLoading: false,
  tasks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT:
      return {
        ...state,
        tasks: [],
        isLoading: false,
        isCreatingTask: false,
      };
    case LOAD_TASKS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TASKS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        tasks: action.payload.tasks,
      };
    case CREATE_TASK:
      return {
        ...state,
        isCreatingTask: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isCreatingTask: true,
        tasks: [action.payload, ...state.tasks],
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        isCreatingTask: false,
      };
    default:
      return state;
  }
};
