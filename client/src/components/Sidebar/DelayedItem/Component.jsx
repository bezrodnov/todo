import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { delay } from '../../../icons';

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
      icon={delay}
      text={t('navigation.sidebar.delayed')}
      {...other}
    />
  );
};

DelayedItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default DelayedItem;
