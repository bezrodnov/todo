import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { project } from '../../../icons';

import AbstractSidebarItem from '../AbstractSidebarItem';

const PATH = '/projects';

const ProjectsItem = ({ history, location, ...other }) => {
  const { t } = useTranslation();

  const goToProjects = () => history.push(PATH);

  const isFocused = location.pathname === PATH;

  return (
    <AbstractSidebarItem
      onClick={goToProjects}
      isFocused={isFocused}
      icon={project}
      text={t('navigation.sidebar.projects')}
      {...other}
    />
  );
};

ProjectsItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default ProjectsItem;
