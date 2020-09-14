import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Add from '@material-ui/icons/Add';
import Arrow from '@material-ui/icons/ArrowRight';
import Clear from '@material-ui/icons/Clear';

import InputBase from '@material-ui/core/InputBase';

import Tooltip from '@material-ui/core/Tooltip';

import { useClickCallback } from '../../util/Hooks';

import { useStyles } from './styles';

import Priority from './Priority';
import PriorityMenu from './PriorityMenu';

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
        value={task.name || ''}
        disabled={!isTitleEditable}
        onClick={onTitleClick}
        onBlur={stopTitleEditing}
        onChange={handleNameChange}
        onKeyDown={onTitleKeyDown}
        inputProps={{ ref: titleRef }}
      />
      <Priority priority={task.priority} onClick={onPriorityClick} />
      <Arrow className={classes.expandIcon} onClick={onToggleExpand} />
      <Tooltip className={removeIconClass} onClick={onRemoveClick} title={t('project.removeSubtask')}>
        <Clear />
      </Tooltip>

      <PriorityMenu anchorEl={priorityEl} onClose={closePriorityMenu} onSelect={selectPriority} />
    </div>
  );
};

export default React.memo(TaskHeader);
