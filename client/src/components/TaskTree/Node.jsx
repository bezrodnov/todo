import React, { useReducer, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import uuid from 'uuid/v4';

import ExpandableContainer from '../ExpandableContainer';
import Header from './Header';
import Details from './Details';

import { useStyles } from './styles';

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

const Node = ({ onRemove, ...initialState }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id, task, subtasks = [], expanded } = state;

  const toggleExpand = useCallback(() => dispatch({ type: 'TOGGLE_EXPAND' }), []);
  const removeSelf = useCallback(() => onRemove(id), [id, onRemove]);

  const onAddSubtask = useCallback(() => dispatch({ type: 'ADD_SUBTASK' }), []);
  const onRemoveSubtask = useCallback(id => dispatch({ type: 'REMOVE_SUBTASK', id }), []);

  const onTaskChange = useCallback(task => dispatch({ type: 'UPDATE_TASK', task }), []);

  const taskClass = clsx(classes.task, { [classes.expanded]: expanded });

  return (
    <div className={classes.container}>
      <div className={taskClass}>
        <Header
          task={task}
          onToggleExpand={toggleExpand}
          onAddSubtask={onAddSubtask}
          onRemove={onRemove && removeSelf}
          onChange={onTaskChange}
        />
        <ExpandableContainer expanded={expanded}>
          <Details task={task} onChange={onTaskChange} />
        </ExpandableContainer>
      </div>
      <ExpandableContainer expanded={expanded}>
        <TransitionGroup className={classes.subtasks}>
          {subtasks.map(subtask => (
            <CSSTransition key={subtask.id} classNames="task" timeout={500}>
              <MemoizedNode {...subtask} onAddSubtask={onAddSubtask} onRemove={onRemoveSubtask} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ExpandableContainer>
    </div>
  );
};

const MemoizedNode = React.memo(Node);
export default MemoizedNode;
