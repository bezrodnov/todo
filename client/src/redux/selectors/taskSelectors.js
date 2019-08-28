import { createSelector } from 'reselect';

const tasksSelector = state => state.task.tasks;

const filterTasksByType = type => tasks => tasks.filter(task => task.type === type);

export const incomingTasksSelector = createSelector(
  tasksSelector,
  filterTasksByType('incoming')
);

export const trashTasksSelector = createSelector(
  tasksSelector,
  filterTasksByType('trash')
);
