import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

import LoadingMask from '../util/LoadingMask';
import { formatDate } from '../util/Date';
import { trash, delay, project, someday, completed } from '../../icons';

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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: 1,
    letterSpacing: '0.00938em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    right: theme.spacing(4),
  },
  startResolveBar: {
    padding: theme.spacing(2, 0, 0),
    '& button': {
      padding: theme.spacing(1, 2),
      margin: theme.spacing(0, 0.5),
    },
  },
  actionsBar: {
    paddingTop: theme.spacing(2),
    '& > div': {
      paddingTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        margin: theme.spacing(0, 0.5),
      },
    },
  },
  resolveStarted: {
    visibility: 'hidden',
  },
}));

const TrashActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    actions.markAsTrash(task, callback);
  };

  return (
    <Tooltip title={t('taskActions.trash')}>
      <Button variant="outlined" onClick={onClick}>
        {trash}
      </Button>
    </Tooltip>
  );
};

const ProjectActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    console.warn('action type "project" is not implemented yet');
  };

  return (
    <Tooltip title={t('taskActions.project')}>
      <Button variant="outlined" onClick={onClick}>
        {project}
      </Button>
    </Tooltip>
  );
};

const ScheduleActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    console.warn('action type "schedule" is not implemented yet');
  };

  return (
    <Tooltip title={t('taskActions.schedule')}>
      <Button variant="outlined" onClick={onClick}>
        {delay}
      </Button>
    </Tooltip>
  );
};

const DelayActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    console.warn('action type "delay" is not implemented yet');
  };

  return (
    <Tooltip title={t('taskActions.delay')}>
      <Button variant="outlined" onClick={onClick}>
        {delay}
      </Button>
    </Tooltip>
  );
};

const SomedayActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    console.warn('action type "someday" is not implemented yet');
  };

  return (
    <Tooltip title={t('taskActions.someday')}>
      <Button variant="outlined" onClick={onClick}>
        {someday}
      </Button>
    </Tooltip>
  );
};

const DoNowActionButton = ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const onClick = () => {
    console.warn('action type "now" is not implemented yet');
  };

  return (
    <Tooltip title={t('taskActions.now')}>
      <Button variant="outlined" onClick={onClick}>
        {completed}
      </Button>
    </Tooltip>
  );
};

const ACTION_BUTTONS = {
  trash: TrashActionButton,
  project: ProjectActionButton,
  schedule: ScheduleActionButton,
  delay: DelayActionButton,
  now: DoNowActionButton,
  someday: SomedayActionButton,
};

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
    availableActions.push('project', 'delay', 'schedule', 'someday', 'reference', 'delegate', 'trash');
  } else if (isActionRequired) {
    availableActions.push('project', 'now', 'delegate', 'schedule', 'repeat');
  } else {
    availableActions.push('trash', 'reference', 'someday');
  }

  return (
    <div {...other}>
      <span className={clsx(classes.startResolveQuery, { [classes.resolveStarted]: isResolveStarted })}>
        {t('incomingTask.isActionRequired')}
      </span>
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
        <span>{t('taskDetails.availableActions')}</span>
        <div>
          {availableActions.map(actionType => {
            const ButtonComponent = ACTION_BUTTONS[actionType];
            return ButtonComponent && <ButtonComponent task={task} callback={onResolveEnd} actions={actions} />;
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
  markAsTrash: PropTypes.func.isRequired,
};

export default IncomingTaskView;
