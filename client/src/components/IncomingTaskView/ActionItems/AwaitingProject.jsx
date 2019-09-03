import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { awaiting } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.awaitingProject.title');
  const description = t('taskActions.awaitingProject.description');
  const onClick = () => console.warn('action is not implemented yet');

  return <BaseActionItem title={title} description={description} icon={awaiting} onClick={onClick} />;
};
