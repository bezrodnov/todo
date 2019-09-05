import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Clear';

import LoadingMask from '../../components/LoadingMask';

// TODO: use MUI styling approach (JSS) instead of SCSS files
import './styles.scss';

const Trash = ({ tasks, deleteTask, isLoadingTasks }) => {
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
            <Tooltip title={t('taskActions.delete')} className="trash-icon">
              <ListItemIcon onClick={getDeleteTaskHandler(task)}>
                <DeleteIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
      {isLoadingTasks && <LoadingMask />}
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
  isLoadingTasks: PropTypes.bool.isRequired,
};

export default Trash;
