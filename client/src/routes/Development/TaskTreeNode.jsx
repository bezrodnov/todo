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
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import { KeyboardDatePicker } from '@material-ui/pickers';

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

const TaskDetails = ({ task, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const onChangeCallback = useCallback(
    e => {
      onChange({ [e.target.name]: e.target.value });
    },
    [onChange]
  );

  return (
    <div className={classes.taskDetails}>
      <InputLabel>{t('task.description')}</InputLabel>
      <InputBase name="description" value={task.description} multiline onChange={onChangeCallback} />

      <InputLabel>{t('task.estimatedDate')}</InputLabel>
      <KeyboardDatePicker name="estimatedDate" autoOk format="MM/dd/yyyy" onChange={onChangeCallback} />

      <InputLabel>{t('task.notes')}</InputLabel>
      <InputBase name="notes" value={task.notes} multiline onChange={onChangeCallback} />

      <InputLabel>{t('task.estimates')}</InputLabel>
      <Select name="estimates" value={task.estimates || ''} onChange={onChangeCallback}>
        <MenuItem value={null}></MenuItem>
        <MenuItem value={5}>{t('estimates.fiveMins')}</MenuItem>
        <MenuItem value={15}>{t('estimates.fifteenMins')}</MenuItem>
        <MenuItem value={30}>{t('estimates.thirtyMins')}</MenuItem>
        <MenuItem value={60}>{t('estimates.hour')}</MenuItem>
        <MenuItem value={120}>{t('estimates.twoHours')}</MenuItem>
        <MenuItem value={240}>{t('estimates.fourHours')}</MenuItem>
        <MenuItem value={480}>{t('estimates.day')}</MenuItem>
        <MenuItem value={560}>{t('estimates.twoDays')}</MenuItem>
        <MenuItem value={1000}>{t('estimates.more')}</MenuItem>
      </Select>
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

  const onTitleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13 || e.keyCode === 27) {
        stopTitleEditing();
      }
    },
    [stopTitleEditing]
  );

  const onTitleClick = useClickCallback(
    useCallback(
      isDoubleClick => {
        if (!isTitleEditable) {
          if (isDoubleClick) {
            startTitleEditing();
          } else {
            onToggleExpand();
          }
        }
      },
      [isTitleEditable, onToggleExpand, startTitleEditing]
    )
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
          <TaskDetails task={task} onChange={onTaskChange} />
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
