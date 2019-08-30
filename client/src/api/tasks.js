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

const saveTask = task => sendJSON(task, '');
const loadTasks = () => axios.get(`/api/tasks`);
const markTaskAsTrash = id => sendJSON({ id }, '/trash');
const deleteTask = id => sendJSON({ id }, '', 'delete');

export { saveTask, loadTasks, markTaskAsTrash, deleteTask };
