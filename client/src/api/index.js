import { registerUser, updateUser } from './users';
import { loadTasks, saveTask, markTaskAsTrash, deleteTask } from './tasks';
import { isAlive, loadUser, login } from './auth';

export default { isAlive, loadUser, login, registerUser, updateUser, loadTasks, saveTask, markTaskAsTrash, deleteTask };
