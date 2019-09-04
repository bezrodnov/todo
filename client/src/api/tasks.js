import axios from 'axios';

const sendJSON = (json, path, method) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = method === 'delete' ? { data: json } : JSON.stringify(json);
  return axios[method || 'post'](`/api/tasks${path}`, body, config);
};

export const saveTask = task => sendJSON(task, '');
export const loadTasks = () => axios.get(`/api/tasks`);
export const markTaskAsTrash = id => sendJSON({ id }, '/trash');
export const markTaskAsReference = id => sendJSON({ id }, '/reference');
export const markTaskAsFinished = id => sendJSON({ id }, '/finish');
export const markTaskAsDelayed = id => sendJSON({ id }, '/delay');
export const deleteTask = id => sendJSON({ id }, '', 'delete');
