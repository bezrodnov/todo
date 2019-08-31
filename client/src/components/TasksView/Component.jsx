import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import { makeStyles } from '@material-ui/core/styles';

import IncomingTaskView from '../IncomingTaskView';
import LoadingMask from '../util/LoadingMask';

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
    height: '100%',
    maxWidth: theme.spacing(100),
    margin: 'auto',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const TasksView = ({ tasks, isLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [swipeDisabled, setSwipeDisabled] = useState(false);

  if (tasks.length === 0) {
    return null;
  }

  const disableSwipe = () => setSwipeDisabled(true);
  const enableSwipe = () => setSwipeDisabled(false);

  const slideRenderer = ({ index, key }) => {
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
  };

  return (
    <>
      <VirtualizeSwipeableViews
        slideRenderer={slideRenderer}
        className={classes.tasksContainer}
        enableMouseEvents
        disabled={swipeDisabled}
      />
      {isLoading && <LoadingMask />}
    </>
  );
};

TasksView.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
      estimatedDate: PropTypes.string,
      creationDate: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TasksView;

const mod = (index, total) => {
  index = index % total;
  while (index < 0) {
    index = total + index;
  }
  return index;
};
