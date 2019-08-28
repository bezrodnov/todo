import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MailIcon from '@material-ui/icons/Mail';

import AbstractItem from '../AbstractItem';

const PATH = '/incoming';

const IncomingTaskItem = ({ taskCount, history, location, expanded }) => {
  const { t } = useTranslation();

  const goToIncoming = () => history.push(PATH);

  const isFocused = location.pathname === PATH || location.pathname === '/home';

  return (
    <AbstractItem
      expanded={expanded}
      onClick={goToIncoming}
      isFocused={isFocused}
      icon={<MailIcon />}
      text={t('navigation.sidebar.inbox')}
      count={taskCount}
    />
  );
};

IncomingTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  taskCount: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default IncomingTaskItem;
