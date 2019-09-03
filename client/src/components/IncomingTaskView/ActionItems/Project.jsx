import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { project } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.project.title');
  const description = t('taskActions.project.description');
  const onClick = () => console.warn('action is not implemented yet');

  return <BaseActionItem title={title} description={description} icon={project} onClick={onClick} />;
};
