import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';

import CreateTaskDialog from '../../components/CreateTaskDialog';
import LoadingMask from '../../components/util/LoadingMask';

// TODO: use MUI styling approach (JSS) instead of SCSS files
import './styles.scss';

const Incoming = ({ tasks, markTaskAsTrash, isLoadingTasks }) => {
  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  const getTaskTrasher = task => e => {
    e.stopPropagation();
    markTaskAsTrash(task._id);
  };

  return (
    <Container className="incoming-tasks">
      <List className="incoming-task-list">
        <Tooltip title={t('createTaskButton')} placement="left">
          <IconButton color="primary" onClick={openCreateTaskDialog} className="create-task-icon">
            <AddIcon />
          </IconButton>
        </Tooltip>
        {tasks.map(task => (
          <ListItem key={task._id} button className="incoming-task-list-item">
            <Tooltip title={t('moveTaskToTrash')} className="trash-icon">
              <ListItemIcon onClick={getTaskTrasher(task)}>
                <DeleteIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
      <CreateTaskDialog open={isCreateTaskDialogOpen} onClose={closeCreateTaskDialog} />
      {isLoadingTasks && <LoadingMask />}
    </Container>
  );
};

Incoming.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
      estimatedDate: PropTypes.string,
    })
  ).isRequired,
  markTaskAsTrash: PropTypes.func.isRequired,
  isLoadingTasks: PropTypes.bool.isRequired,
};

export default Incoming;
