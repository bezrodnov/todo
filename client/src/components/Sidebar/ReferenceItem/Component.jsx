import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { reference } from '../../../icons';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/reference';

const ReferenceItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToReference = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToReference}
      isFocused={isFocused}
      icon={reference}
      text={t('navigation.sidebar.reference')}
      {...other}
    />
  );
};

ReferenceItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default ReferenceItem;
