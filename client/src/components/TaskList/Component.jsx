import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Arrow from '@material-ui/icons/ArrowRight';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import EditTask from './EditTask';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 1),
  },
  topToolBar: {
    display: 'flex',
  },
  task: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
    transition: theme.transitions.create('height'),
    overflow: 'hidden',

    '&:hover $taskHeader, &$expanded $taskHeader': {
      background: lighten(theme.palette.primary.light, 0.5),
      color: theme.palette.getContrastText(lighten(theme.palette.primary.light, 0.5)),
    },
    '&:not(:hover):not($expanded):nth-child(2n + 1) $taskHeader': {
      background: lighten(theme.palette.primary.light, 0.75),
      color: theme.palette.getContrastText(lighten(theme.palette.primary.light, 0.75)),
    },
    '&:not(:hover):not($expanded):nth-child(2n) $taskHeader': {
      background: lighten(theme.palette.primary.light, 0.95),
      color: theme.palette.getContrastText(lighten(theme.palette.primary.light, 0.95)),
    },

    '&:first-child': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    '&:not(:first-child)': {
      borderTopWidth: 0,
    },

    '&$expanded $arrow': {
      transform: 'rotate(90deg)',
    },
    '&$expanded $taskEditor': {
      padding: theme.spacing(1, 1, 2),
      maxHeight: 500,
    },
  },
  taskHeader: {
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(4)}px 1fr ${theme.spacing(0)}px`,
    alignItems: 'center',
    cursor: 'pointer',
    paddingRight: theme.spacing(2),
    transition: theme.transitions.create(['background', 'color']),
    zIndex: 1,
  },
  taskTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  taskEditor: {
    padding: theme.spacing(0, 1),
    transition: theme.transitions.create(['max-height', 'padding-top', 'padding-bottom']),
    height: 'auto',
    maxHeight: 0,
    overflow: 'hidden auto',
  },
  arrow: {
    transition: theme.transitions.create('transform'),
    transform: 'rotate(0deg)',
    color: theme.palette.secondary.dark,
    fontSize: '2rem',
    verticalAlign: 'middle',
  },
  divider: { flex: 1 },
  expanded: {},
}));

const initialState = {
  sortBy: 'creationDate',
  expandedTaskId: null,
};

const sortFns = {
  creationDate: (a, b) => (a.creationDate > b.creationDate ? 1 : -1),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy,
        sortFn: sortFns[action.sortBy],
      };
    case 'TOGGLE_EXPAND':
      return {
        ...state,
        expandedTaskId: action.id === state.expandedTaskId ? null : action.id,
      };
    default:
      return state;
  }
};

const TaskList = ({ tasks }) => {
  // const { t } = useTranslation();
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderTask = task => {
    const taskClassName = clsx(classes.task, { [classes.expanded]: state.expandedTaskId === task._id });
    const handleExpand = () => dispatch({ type: 'TOGGLE_EXPAND', id: task._id });

    return (
      <div key={task._id} className={taskClassName}>
        <div className={classes.taskHeader} onClick={handleExpand}>
          <Arrow className={classes.arrow} />
          <span className={classes.taskTitle}>{task.name}</span>
        </div>
        <EditTask task={task} className={classes.taskEditor} />
      </div>
    );
  };

  return (
    <Container>
      <div className={classes.container}>{tasks.sort(state.sortFn).map(renderTask)}</div>
    </Container>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
      priority: PropTypes.string,
    })
  ),
};

export default TaskList;
