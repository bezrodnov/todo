import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import Delete from '@material-ui/icons/Delete';

import CreateTaskDialog from '../../components/CreateTaskDialog';

import './styles.scss';

const Incoming = ({ tasks, markTaskAsTrash }) => {
  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  const getTaskTrasher = task => e => {
    e.stopPropagation();
    markTaskAsTrash(task._id);
  };

  return (
    <Container>
      <Button color="primary" onClick={openCreateTaskDialog}>
        {t('createTaskButton')}
      </Button>
      <List className="incoming-task-list">
        {tasks.map(task => (
          <ListItem key={task._id} button className="incoming-task-list-item">
            <Tooltip title={t('moveTaskToTrash')} className="trash-icon">
              <ListItemIcon onClick={getTaskTrasher(task)}>
                <Delete />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
      <CreateTaskDialog open={isCreateTaskDialogOpen} onClose={closeCreateTaskDialog} />
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
};

export default Incoming;
