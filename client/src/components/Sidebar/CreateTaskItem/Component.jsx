import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/AddCircle';

import CreateTaskDialog from '../../../components/CreateTaskDialog';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1),
    },
  },
  listItemIcon: {
    color: theme.palette.background.default,
  },
  listItemText: {
    color: theme.palette.background.default,
  },
}));

const CreateTaskItem = ({ expanded }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  return (
    <>
      <ListItem button onClick={openCreateTaskDialog} className={classes.listItem}>
        <ListItemIcon className={classes.listItemIcon}>
          <Tooltip title={expanded ? '' : t('createTaskButton')} placement="right">
            <AddIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText
          primary={t('navigation.sidebar.createTask')}
          primaryTypographyProps={{ className: classes.listItemText }}
        />
      </ListItem>
      <CreateTaskDialog open={isCreateTaskDialogOpen} onClose={closeCreateTaskDialog} />
    </>
  );
};

CreateTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default CreateTaskItem;
