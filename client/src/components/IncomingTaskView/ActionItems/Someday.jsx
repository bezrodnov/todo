import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { someday } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.someday.title');
  const description = t('taskActions.someday.description');
  const onClick = () => console.warn('action is not implemented yet');

  return <BaseActionItem title={title} description={description} icon={someday} onClick={onClick} />;
};
