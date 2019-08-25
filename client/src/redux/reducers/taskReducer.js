import {
  LOGIN_SUCCESS,
  LOGOUT,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
  MARK_TASK_AS_TRASH,
  MARK_TASK_AS_TRASH_SUCCESS,
  MARK_TASK_AS_TRASH_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from '../actions';

const initialState = {
  isCreating: false,
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
        isCreating: false,
      };
    case LOAD_TASKS:
    case MARK_TASK_AS_TRASH:
    case DELETE_TASK:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TASKS_FAIL:
    case MARK_TASK_AS_TRASH_FAIL:
    case DELETE_TASK_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    case CREATE_TASK:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isCreating: false,
        tasks: [action.payload, ...state.tasks],
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        isCreating: false,
      };
    case MARK_TASK_AS_TRASH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map(task => (task._id === action.payload ? { ...task, type: 'trash' } : task)),
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
    default:
      return state;
  }
};
