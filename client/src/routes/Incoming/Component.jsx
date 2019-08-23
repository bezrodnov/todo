import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CreateTaskDialog from '../../components/CreateTaskDialog';

const Incoming = ({ tasks }) => {
  const [isCreateTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openCreateTaskDialog = () => setCreateTaskDialogOpen(true);
  const closeCreateTaskDialog = () => setCreateTaskDialogOpen(false);

  return (
    <Container>
      <Button color="primary" onClick={openCreateTaskDialog}>
        {t('createTaskButton')}
      </Button>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id}>
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
};

export default Incoming;
