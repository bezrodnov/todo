import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { repeating } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.repeating.title');
  const description = t('taskActions.repeating.description');
  const onClick = () => console.warn('action is not implemented yet'); // TODO: implement

  return <BaseActionItem title={title} description={description} icon={repeating} onClick={onClick} />;
};
