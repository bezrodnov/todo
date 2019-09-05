import React from 'react';
import { useSelector } from 'react-redux';

import TasksView from '../components/TasksView';
import { incomingTasksSelector } from '../redux/selectors';

export default () => {
  const tasks = useSelector(incomingTasksSelector);
  return <TasksView tasks={tasks} />;
};
