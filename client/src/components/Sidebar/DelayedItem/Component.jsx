import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TimeIcon from '@material-ui/icons/Schedule';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/delayed';

const DelayedItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToDelayed = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToDelayed}
      isFocused={isFocused}
      icon={<TimeIcon />}
      text={t('navigation.sidebar.delayed')}
      {...other}
    />
  );
};

DelayedItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default DelayedItem;
