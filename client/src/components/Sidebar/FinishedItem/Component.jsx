import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AbstractSidebarItem from '../AbstractSidebarItem';

import { completed } from '../../../icons';

const PATH = '/finished';

const FinishedItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToFinished = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToFinished}
      isFocused={isFocused}
      icon={completed}
      text={t('navigation.sidebar.finished')}
      {...other}
    />
  );
};

FinishedItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default FinishedItem;
