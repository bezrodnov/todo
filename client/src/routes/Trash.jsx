import React from 'react';
import { useSelector } from 'react-redux';

import { trashTasksSelector } from '../redux/selectors';
import TaskList from '../components/TaskList';

const Trash = () => {
  const tasks = useSelector(trashTasksSelector);
  return <TaskList tasks={tasks} />;
};

export default Trash;
