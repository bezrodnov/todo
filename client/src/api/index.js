import { registerUser, updateUser } from './users';
import { loadTasks, createTask, markTaskAsTrash, deleteTask } from './tasks';
import { loadUser, login } from './auth';

export default { loadUser, login, registerUser, updateUser, loadTasks, createTask, markTaskAsTrash, deleteTask };
