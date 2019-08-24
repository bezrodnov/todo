import axios from 'axios';

const sendJSON = (payload, path) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(payload);
  return axios.post(`/api/tasks${path}`, body, config);
};

const createTask = task => sendJSON(task, '');
const loadTasks = () => axios.get(`/api/tasks`);
const markTaskAsTrash = id => sendJSON({ id }, '/trash');
const deleteTask = id => axios.delete(`/api/tasks/${id}`);

export { createTask, loadTasks, markTaskAsTrash, deleteTask };
