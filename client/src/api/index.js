import { registerUser, updateUser } from './users';
import { loadTasks, saveTask, markTaskAsTrash, deleteTask } from './tasks';
import { loadUser, login } from './auth';

export default { loadUser, login, registerUser, updateUser, loadTasks, saveTask, markTaskAsTrash, deleteTask };
