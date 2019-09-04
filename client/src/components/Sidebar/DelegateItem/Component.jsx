import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { delegate } from '../../../icons';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/delegate';

const DelegateItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToDelegate = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToDelegate}
      isFocused={isFocused}
      icon={delegate}
      text={t('navigation.sidebar.delegate')}
      {...other}
    />
  );
};

DelegateItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default DelegateItem;
