import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MailIcon from '@material-ui/icons/Mail';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/incoming';

const IncomingItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToIncoming = () => history.push(PATH);

  const isFocused = location.pathname === PATH || location.pathname === '/home';

  return (
    <AbstractSidebarItem
      onClick={goToIncoming}
      isFocused={isFocused}
      icon={<MailIcon />}
      text={t('navigation.sidebar.inbox')}
      {...other}
    />
  );
};

IncomingItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default IncomingItem;
