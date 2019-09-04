import {
  LOGIN_SUCCESS,
  LOGOUT,
  SAVE_TASK,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAIL,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAIL,
  MARK_TASK_AS_TRASH,
  MARK_TASK_AS_TRASH_SUCCESS,
  MARK_TASK_AS_TRASH_FAIL,
  MARK_TASK_AS_REFERENCE,
  MARK_TASK_AS_REFERENCE_SUCCESS,
  MARK_TASK_AS_REFERENCE_FAIL,
  MARK_TASK_AS_FINISHED,
  MARK_TASK_AS_FINISHED_SUCCESS,
  MARK_TASK_AS_FINISHED_FAIL,
  MARK_TASK_AS_DELAYED,
  MARK_TASK_AS_DELAYED_SUCCESS,
  MARK_TASK_AS_DELAYED_FAIL,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from '../actions';

const initialState = {
  isSaving: false,
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
        isSaving: false,
      };
    case LOAD_TASKS:
    case DELETE_TASK:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TASKS_FAIL:
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
    case SAVE_TASK:
    case MARK_TASK_AS_TRASH:
    case MARK_TASK_AS_REFERENCE:
    case MARK_TASK_AS_FINISHED:
    case MARK_TASK_AS_DELAYED:
      return {
        ...state,
        isSaving: true,
      };
    case SAVE_TASK_SUCCESS:
      return {
        ...state,
        isSaving: false,
        tasks: [action.payload, ...state.tasks],
      };
    case SAVE_TASK_FAIL:
    case MARK_TASK_AS_TRASH_FAIL:
    case MARK_TASK_AS_REFERENCE_FAIL:
    case MARK_TASK_AS_FINISHED_FAIL:
    case MARK_TASK_AS_DELAYED_FAIL:
      return {
        ...state,
        isSaving: false,
      };
    case MARK_TASK_AS_TRASH_SUCCESS:
      return {
        ...state,
        isSaving: false,
        tasks: updateTaskInStore(state, action.payload, { type: 'trash' }),
      };
    case MARK_TASK_AS_REFERENCE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        tasks: updateTaskInStore(state, action.payload, { type: 'reference' }),
      };
    case MARK_TASK_AS_FINISHED_SUCCESS:
      return {
        ...state,
        isSaving: false,
        tasks: updateTaskInStore(state, action.payload, { type: 'finished' }),
      };
    case MARK_TASK_AS_DELAYED_SUCCESS:
      return {
        ...state,
        isSaving: false,
        tasks: updateTaskInStore(state, action.payload, { type: 'someday' }),
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

const updateTaskInStore = (state, taskId, updates) =>
  state.tasks.map(task => (task._id === taskId ? { ...task, ...updates } : task));
