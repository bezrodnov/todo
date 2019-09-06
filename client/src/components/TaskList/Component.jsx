import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Arrow from '@material-ui/icons/ArrowRight';
import { makeStyles, lighten } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 1),
  },
  topToolBar: {
    display: 'flex',
  },
  task: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
    transition: theme.transitions.create('height'),
    cursor: 'pointer',

    '&:hover, &$expanded': {
      background: lighten(theme.palette.primary.light, 0.5),
      color: theme.palette.getContrastText(lighten(theme.palette.primary.light, 0.5)),
    },
    '&:not(:hover):not($expanded):nth-child(2n + 1)': {
      background: lighten(theme.palette.primary.light, 0.75),
      color: theme.palette.getContrastText(lighten(theme.palette.primary.light, 0.75)),
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
    case 'COLLAPSE':
      return {
        ...state,
        expandedTaskId: null,
      };
    default:
      return state;
  }
};

const TaskList = ({ tasks }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderTask = task => {
    const taskClassName = clsx(classes.task, { [classes.expanded]: state.expandedTaskId === task._id });
    const handleExpand = () => dispatch({ type: 'TOGGLE_EXPAND', id: task._id });
    return (
      <div key={task._id} className={taskClassName} onClick={handleExpand}>
        <Arrow className={classes.arrow} />
        {task.name}
        {task.description}
      </div>
    );
  };

  return (
    <Container>
      <div className={classes.container}>
        <div>{tasks.sort(state.sortFn).map(renderTask)}</div>
      </div>
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
