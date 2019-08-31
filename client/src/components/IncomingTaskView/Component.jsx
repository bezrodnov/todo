import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

import LoadingMask from '../util/LoadingMask';
import { formatDate } from '../util/Date';
import { trash } from '../../icons';

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
    '& button': {
      padding: theme.spacing(2, 0),
    },
  },
  actionsBar: {
    paddingTop: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  resolveStarted: {
    visibility: 'hidden',
  },
}));

const IncomingTaskView = ({ task, taskLabel, markAsTrash, onResolveStart, onResolveEnd, isSaving, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isActionRequired, setActionRequired] = useState();

  const moveTaskToTrash = () => {
    onResolveStart();
    markAsTrash(task, onResolveEnd);
  };

  const onActionRequiredClick = isRequired => () => {
    onResolveStart();
    setActionRequired(isRequired);
  };

  const isResolveStarted = isActionRequired !== undefined;

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
        <Button onClick={onActionRequiredClick(false)}>{t('global.no')}</Button>
        <Button onClick={onActionRequiredClick(true)}>{t('global.yes')}</Button>
      </div>

      <div className={classes.actionsBar}>
        <span className={clsx({ [classes.resolveStarted]: isResolveStarted })}>{t('taskDetails.quickDecisions')}</span>
        <div className={classes.toolbar}>
          <Tooltip title={t('moveTaskToTrash')}>
            <IconButton onClick={moveTaskToTrash}>{trash}</IconButton>
          </Tooltip>
        </div>
      </div>
      {isSaving && <LoadingMask />}
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
  isSaving: PropTypes.bool.isRequired,
  markAsTrash: PropTypes.func.isRequired,
};

export default IncomingTaskView;
