import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AbstractSidebarItem from '../AbstractSidebarItem';
import { mdiCalendarClock } from '@mdi/js';

const PATH = '/someday';

const SomedayItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToSomeday = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToSomeday}
      isFocused={isFocused}
      svgIconPath={mdiCalendarClock}
      text={t('navigation.sidebar.someday')}
      {...other}
    />
  );
};

SomedayItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default SomedayItem;
