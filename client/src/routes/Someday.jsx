import React from 'react';
import { useSelector } from 'react-redux';

import { somedayTasksSelector } from '../redux/selectors';
import TaskList from '../components/TaskList';

const Someday = () => {
  const tasks = useSelector(somedayTasksSelector);
  return <TaskList tasks={tasks} />;
};

export default Someday;
