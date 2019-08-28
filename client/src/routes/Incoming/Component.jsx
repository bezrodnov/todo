import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import LoadingMask from '../../components/util/LoadingMask';

// TODO: use MUI styling approach (JSS) instead of SCSS files
import './styles.scss';

const Incoming = ({ tasks, markTaskAsTrash, isLoadingTasks }) => {
  const { t } = useTranslation();

  const getTaskTrasher = task => e => {
    e.stopPropagation();
    markTaskAsTrash(task._id);
  };

  return (
    <Container className="incoming-tasks">
      <List className="incoming-task-list">
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
