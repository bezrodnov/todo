import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

import LoadingMask from '../util/LoadingMask';
import { formatDate } from '../util/Date';
import { trash } from '../../icons';

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
  taskDetails: {
    width: '100%',
    position: 'relative',
  },
  taskName: {
    pointerEvents: 'none',
  },
  creationDate: {
    position: 'absolute',
    top: '-0.4rem',
    padding: '0 0.25rem',
    fontSize: '0.75rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: 1,
    letterSpacing: '0.00938em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    right: theme.spacing(4),
  },
  quickDecisions: {
    paddingTop: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const TasksView = ({ tasks, isLoading, markAsTrash }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const slideRenderer = ({ index, key }) => {
    const taskNo = mod(index, tasks.length);
    const task = tasks[taskNo];
    const label = t('taskDetails.indexInRange', { index: taskNo + 1, total: tasks.length });

    const moveTaskToTrash = () => markAsTrash(task);

    return (
      <div key={key} className={classes.taskContainer}>
        <div className={classes.taskDetails}>
          <TextField
            variant="outlined"
            label={label}
            className={classes.taskName}
            value={task.name}
            multiline
            fullWidth
          />
          <div className={classes.creationDate}>
            {t('taskDetails.creationDate', { date: formatDate(task.creationDate) })}
          </div>
        </div>
        <div className={classes.quickDecisions}>
          {t('taskDetails.quickDecisions')}
          <div className={classes.toolbar}>
            <Tooltip title={t('moveTaskToTrash')}>
              <IconButton onClick={moveTaskToTrash}>{trash}</IconButton>
            </Tooltip>
          </div>
        </div>
        {isLoading && <LoadingMask />}
      </div>
    );
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <VirtualizeSwipeableViews slideRenderer={slideRenderer} className={classes.tasksContainer} enableMouseEvents />
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
  isLoading: PropTypes.func.isRequired,
  markAsTrash: PropTypes.func.isRequired,
};

export default TasksView;

const mod = (index, total) => {
  index = index % total;
  while (index < 0) {
    index = total + index;
  }
  return index;
};
