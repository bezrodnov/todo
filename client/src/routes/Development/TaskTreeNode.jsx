import React, { useReducer, useCallback, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import uuid from 'uuid/v4';

import Add from '@material-ui/icons/Add';
import Arrow from '@material-ui/icons/ArrowRight';
import Clear from '@material-ui/icons/Clear';

import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import ExpandableContainer from './ExpandableContainer';

import { useClickCallback } from '../../util/Hooks';

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

const PriorityMenu = ({ anchorEl, onClose, onSelect }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {['high', 'medium', 'low', null].map(priority => (
        <MenuItem key={priority || 'unset'} onClick={() => onSelect(priority)}>
          <TaskPriority priority={priority} />
        </MenuItem>
      ))}
    </Menu>
  );
};

const TaskDetails = ({ task }) => {
  const classes = useStyles();
  return (
    <div className={classes.taskDetails}>
      <div className={classes.field}>
        <InputLabel>Description</InputLabel>
        <InputBase value={task.description} multiline />
      </div>
      <div>estimated date</div>
      <div className={classes.field}>
        <InputLabel>Comments</InputLabel>
        <InputBase value={task.comments} multiline />
      </div>
    </div>
  );
};

const TaskHeader = ({ task, onToggleExpand, onAddSubtask, onRemove, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [priorityEl, setPriorityEl] = React.useState(null);
  const [isTitleEditable, setTitleEditable] = React.useState(false);
  const titleRef = useRef();

  const removeIconClass = clsx(classes.icon, { [classes.invisible]: !onRemove });

  const onAddClick = useCallback(
    e => {
      e.stopPropagation();
      onAddSubtask();
    },
    [onAddSubtask]
  );

  const onRemoveClick = useCallback(
    e => {
      e.stopPropagation();
      onRemove();
    },
    [onRemove]
  );

  const handleNameChange = useCallback(e => onChange({ name: e.target.value }), [onChange]);

  const onPriorityClick = useCallback(e => setPriorityEl(e.target), []);
  const closePriorityMenu = useCallback(() => setPriorityEl(null), []);
  const selectPriority = useCallback(
    priority => {
      closePriorityMenu();
      onChange({ priority });
    },
    [closePriorityMenu, onChange]
  );
  const startTitleEditing = useCallback(e => {
    setTitleEditable(true);
    requestAnimationFrame(() => {
      titleRef.current.focus();
      const selectIdx = titleRef.current.value.length;
      titleRef.current.setSelectionRange(selectIdx, selectIdx);
    });
  }, []);

  const stopTitleEditing = useCallback(() => setTitleEditable(false), []);

  const onTitleKeyDown = useCallback(e => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      stopTitleEditing();
    }
  }, []);

  const onTitleClick = useClickCallback(
    isDoubleClick => {
      if (!isTitleEditable) {
        if (isDoubleClick) {
          startTitleEditing();
        } else {
          onToggleExpand();
        }
      }
    },
    [isTitleEditable]
  );

  return (
    <div className={classes.taskHeader}>
      <Tooltip className={classes.icon} onClick={onAddClick} title={t('project.addSubtask')}>
        <Add />
      </Tooltip>
      <InputBase
        className={classes.taskTitle}
        value={task.name}
        disabled={!isTitleEditable}
        onClick={onTitleClick}
        onBlur={stopTitleEditing}
        onChange={handleNameChange}
        onKeyDown={onTitleKeyDown}
        inputProps={{ ref: titleRef }}
      />
      <TaskPriority priority={task.priority} onClick={onPriorityClick} />
      <Arrow className={classes.expandIcon} onClick={onToggleExpand} />
      <Tooltip className={removeIconClass} onClick={onRemoveClick} title={t('project.removeSubtask')}>
        <Clear />
      </Tooltip>

      <PriorityMenu anchorEl={priorityEl} onClose={closePriorityMenu} onSelect={selectPriority} />
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SUBTASK':
      return {
        ...state,
        expanded: true,
        subtasks: [...(state.subtasks || []), { task: {}, subtasks: [], id: uuid() }],
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
    case 'UPDATE_TASK':
      return {
        ...state,
        task: { ...state.task, ...action.task },
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

  const onAddSubtask = useCallback(id => dispatch({ type: 'ADD_SUBTASK' }), []);
  const onRemoveSubtask = useCallback(id => dispatch({ type: 'REMOVE_SUBTASK', id }), []);

  const onTaskChange = useCallback(task => dispatch({ type: 'UPDATE_TASK', task }), []);

  const taskClass = clsx(classes.task, { [classes.expanded]: expanded });

  return (
    <div className={classes.container}>
      <div className={taskClass}>
        <TaskHeader
          task={task}
          onToggleExpand={toggleExpand}
          onAddSubtask={onAddSubtask}
          onRemove={onRemove && removeSelf}
          onChange={onTaskChange}
        />
        <ExpandableContainer expanded={expanded}>
          <TaskDetails task={task} />
        </ExpandableContainer>
      </div>
      <ExpandableContainer expanded={expanded}>
        <TransitionGroup className={classes.subtasks}>
          {subtasks.map(subtask => (
            <CSSTransition key={subtask.id} classNames="task" timeout={500}>
              <TaskTreeNode {...subtask} onAddSubtask={onAddSubtask} onRemove={onRemoveSubtask} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ExpandableContainer>
    </div>
  );
};

export default TaskTreeNode;
