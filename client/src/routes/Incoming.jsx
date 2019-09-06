import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import { makeStyles } from '@material-ui/core/styles';

import { incomingTasksSelector } from '../redux/selectors';

import IncomingTaskView from '../components/IncomingTaskView';
import LoadingMask from '../components/LoadingMask';

const useStyles = makeStyles(theme => ({
  tasksContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    '& .react-swipeable-view-container': {
      minWidth: '100%',
      maxWidth: '100%',
    },
    userSelect: 'none',
  },
  taskContainer: {
    position: 'relative',
    maxWidth: theme.spacing(100),
    margin: 'auto',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const Incoming = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [swipeDisabled, setSwipeDisabled] = useState(false);
  const tasks = useSelector(incomingTasksSelector);
  const isLoading = useSelector(state => state.task.isLoading);
  const disableSwipe = useCallback(() => setSwipeDisabled(true), []);
  const enableSwipe = useCallback(() => setSwipeDisabled(false), []);

  const slideRenderer = useCallback(
    ({ index, key }) => {
      const taskNo = mod(index, tasks.length);
      const task = tasks[taskNo];
      const label = t('taskDetails.indexInRange', { index: taskNo + 1, total: tasks.length });

      return (
        <IncomingTaskView
          key={key + task._id}
          task={task}
          taskLabel={label}
          className={classes.taskContainer}
          onResolveStart={disableSwipe}
          onResolveEnd={enableSwipe}
        />
      );
    },
    [disableSwipe, enableSwipe, t, tasks, classes.taskContainer]
  );

  return (
    tasks.length > 0 && (
      <>
        <VirtualizeSwipeableViews
          slideRenderer={slideRenderer}
          className={classes.tasksContainer}
          enableMouseEvents
          disabled={swipeDisabled}
        />
        {isLoading && <LoadingMask />}
      </>
    )
  );
};

export default Incoming;

const mod = (index, total) => {
  index = index % total;
  while (index < 0) {
    index = total + index;
  }
  return index;
};
