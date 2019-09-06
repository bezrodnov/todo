import React from 'react';
import { useSelector } from 'react-redux';

import { referenceTasksSelector } from '../redux/selectors';
import TaskList from '../components/TaskList';

const Reference = () => {
  const tasks = useSelector(referenceTasksSelector);
  return <TaskList tasks={tasks} />;
};

export default Reference;
