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

import DeleteIcon from '@material-ui/icons/Clear';

import './styles.scss';

const Trash = ({ tasks, deleteTask }) => {
  const { t } = useTranslation();

  const getDeleteTaskHandler = task => e => {
    e.stopPropagation();
    deleteTask(task._id);
  };

  return (
    <Container>
      <List className="trash-task-list">
        {tasks.map(task => (
          <ListItem key={task._id} button className="trash-task-list-item">
            <Tooltip title={t('deleteTask')} className="trash-icon">
              <ListItemIcon onClick={getDeleteTaskHandler(task)}>
                <DeleteIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

Trash.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      notes: PropTypes.string,
      estimatedDate: PropTypes.string,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Trash;
