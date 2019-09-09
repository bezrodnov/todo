import React, { useReducer, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Arrow from '@material-ui/icons/ArrowRight';
import Clear from '@material-ui/icons/Clear';

import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import ExpandableContainer from './ExpandableContainer';

import { useStyles } from './styles';

const TaskPriority = ({ priority, ...other }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const className = clsx(classes.taskPriority, classes[`${priority || 'unset'}Priority`]);
  return (
    <Tooltip title={t(`priorities.${priority || 'unset'}`)} placement="left">
      <span className={className} {...other} />
    </Tooltip>
  );
};

const TaskDetails = ({ task }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.field}>
        <InputLabel>Description</InputLabel>
        <InputBase value={task.description} multiline />
      </div>
      <div>estimated date</div>
      <div className={classes.field}>
        <InputLabel>Comments</InputLabel>
        <InputBase value={task.comments} multiline />
      </div>
    </>
  );
};

const TaskHeader = ({ task, onToggleExpand, onRemove }) => {
  const classes = useStyles();
  const [priorityEl, setPriorityEl] = React.useState(null);

  const removeIconClass = clsx(classes.removeIcon, { [classes.invisible]: !onRemove });

  const onRemoveClick = useCallback(
    e => {
      e.stopPropagation();
      onRemove();
    },
    [onRemove]
  );

  const onPriorityClick = useCallback(e => setPriorityEl(e.target), []);
  const closePriorityMenu = useCallback(() => setPriorityEl(null), []);
  const selectPriority = useCallback(
    priority => {
      closePriorityMenu();
      // TODO: declare and execute callback to update task priority
    },
    [closePriorityMenu]
  );

  return (
    <div className={classes.taskHeader}>
      <InputBase className={classes.taskTitle} onClick={onToggleExpand} value={task.name} />
      <TaskPriority priority={task.priority} onClick={onPriorityClick} />
      <Arrow className={classes.expandIcon} onClick={onToggleExpand} />
      <span className={removeIconClass} onClick={onRemoveClick}>
        <Clear />
      </span>

      <Menu anchorEl={priorityEl} open={Boolean(priorityEl)} onClose={closePriorityMenu}>
        {['high', 'medium', 'low', null].map(priority => (
          <MenuItem key={priority || 'unset'} onClick={() => selectPriority(priority)}>
            <TaskPriority priority={priority} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SUBTASK':
      return {
        ...state,
        subtasks: [...state.subtasks, {}],
      };
    case 'REMOVE_SUBTASK':
      return {
        ...state,
        subtasks: state.subtasks.reduce(
          (subtasks, subtask) => (subtask.id === action.id ? subtasks : [...subtasks, subtask]),
          []
        ),
      };
    case 'TOGGLE_EXPAND':
      return {
        ...state,
        expanded: !state.expanded,
      };
    default:
      return state;
  }
};

const TaskTreeNode = ({ onRemove, onUpdate, ...initialState }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id, task, subtasks = [], expanded } = state;

  const toggleExpand = useCallback(() => dispatch({ type: 'TOGGLE_EXPAND' }), []);
  const removeSelf = useCallback(() => onRemove(id), [id, onRemove]);

  const onRemoveChild = useCallback(id => dispatch({ type: 'REMOVE_SUBTASK', id }), []);

  const taskClass = clsx(classes.task, { [classes.expanded]: expanded });

  return (
    <div className={classes.container}>
      <div className={taskClass}>
        <TaskHeader task={task} onToggleExpand={toggleExpand} onRemove={onRemove && removeSelf} />
        <ExpandableContainer className={classes.taskDetails} expanded={expanded}>
          <TaskDetails task={task} />
        </ExpandableContainer>
      </div>
      <ExpandableContainer expanded={expanded}>
        <TransitionGroup className={classes.subtasks}>
          {subtasks.map(subtask => (
            <CSSTransition key={subtask.id} classNames="task" timeout={500}>
              <TaskTreeNode {...subtask} onRemove={onRemoveChild} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ExpandableContainer>
    </div>
  );
};

export default TaskTreeNode;
