import React from 'react';
import { useSelector } from 'react-redux';

import { finishedTasksSelector } from '../redux/selectors';
import TaskList from '../components/TaskList';

const Finished = () => {
  const tasks = useSelector(finishedTasksSelector);
  return <TaskList tasks={tasks} />;
};

export default Finished;
