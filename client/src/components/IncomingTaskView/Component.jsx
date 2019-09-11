import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import LoadingMask from '../LoadingMask';
import { formatDate } from '../../util/Date';

import * as ActionItems from './ActionItems';

const useStyles = makeStyles(theme => ({
  startResolveQuery: {
    padding: theme.spacing(0, 2, 3),
    fontWeight: 600,
    fontSize: '1.25rem',
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
    fontWeight: '400',
    lineHeight: 1,
    letterSpacing: '0.00938em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    right: theme.spacing(1),
  },
  startResolveBar: {
    padding: theme.spacing(2, 0, 0),
    '& button': {
      padding: theme.spacing(1, 2),
      margin: theme.spacing(0, 0.5),
    },
  },
  actionsBar: {
    position: 'relative',
    marginTop: theme.spacing(3),
    width: '100%',
    maxHeight: 'calc(100% - 300px)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
  },
  actionList: {
    padding: theme.spacing(1),
    height: '100%',
    overflow: 'hidden auto',
    '& button': {
      margin: theme.spacing(0.25, 0.25),
    },
  },
  resolveStarted: {
    visibility: 'hidden',
  },
  title: {
    position: 'absolute',
    top: '-0.4rem',
    left: '0.4rem',
    padding: '0 0.25rem',
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: 1,
    letterSpacing: '0.00938em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
  },
}));

const IncomingTaskView = ({ task, taskLabel, actions, onResolveStart, onResolveEnd, isLoading, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isActionRequired, setActionRequired] = useState();

  const onActionRequiredClick = isRequired => () => {
    onResolveStart();
    setActionRequired(isRequired);
  };

  const isResolveStarted = isActionRequired !== undefined;

  const renderResolveButton = isActionRequired => (
    <Button variant="contained" onClick={onActionRequiredClick(isActionRequired)}>
      {t(isActionRequired ? 'global.yes' : 'global.no')}
    </Button>
  );

  const availableActions = [];
  if (!isResolveStarted) {
    availableActions.push(
      'Project',
      'Delay',
      'Schedule',
      'Someday',
      'AwaitingProject',
      'Reference',
      'Delegate',
      'Trash'
    );
  } else if (isActionRequired) {
    availableActions.push('Project', 'DoNow', 'Delegate', 'Schedule', 'Repeat');
  } else {
    availableActions.push('Trash', 'Reference', 'Someday');
  }

  return (
    <div {...other}>
      <div className={clsx(classes.startResolveQuery, { [classes.resolveStarted]: isResolveStarted })}>
        {t('incomingTask.isActionRequired')}
      </div>
      <div className={classes.taskDetails}>
        <TextField
          variant="outlined"
          label={taskLabel}
          className={classes.taskName}
          value={task.name}
          multiline
          fullWidth
          inputProps={{
            tabIndex: '-1',
          }}
        />
        <div className={classes.creationDate}>
          {t('taskDetails.creationDate', { date: formatDate(task.creationDate) })}
        </div>
      </div>

      <div className={clsx(classes.startResolveBar, { [classes.resolveStarted]: isResolveStarted })}>
        {renderResolveButton(false)}
        {renderResolveButton(true)}
      </div>

      <div className={classes.actionsBar}>
        <span className={classes.title}>{t('taskDetails.availableActions')}</span>
        <div className={classes.actionList}>
          {availableActions.map(actionType => {
            const ButtonComponent = ActionItems[actionType];
            return <ButtonComponent key={actionType} task={task} callback={onResolveEnd} actions={actions} />;
          })}
        </div>
      </div>
      {isLoading && <LoadingMask />}
    </div>
  );
};

IncomingTaskView.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    notes: PropTypes.string,
    estimatedDate: PropTypes.string,
    creationDate: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

export default IncomingTaskView;
