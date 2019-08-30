import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@material-ui/icons/Delete';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/trash';

const TrashTaskItem = ({ taskCount, history, location, expanded }) => {
  const { t } = useTranslation();

  const goToTrash = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      expanded={expanded}
      onClick={goToTrash}
      isFocused={isFocused}
      icon={<DeleteIcon />}
      text={t('navigation.sidebar.trash')}
      count={taskCount}
    />
  );
};

TrashTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  taskCount: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default TrashTaskItem;
