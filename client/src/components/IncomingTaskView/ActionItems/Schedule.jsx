import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { delay } from '../../../icons'; // TODO: which icon to use for the Schedule action

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.schedule.title');
  const description = t('taskActions.schedule.description');
  const onClick = () => console.warn('action is not implemented yet'); // TODO: implement

  return <BaseActionItem title={title} description={description} icon={delay} onClick={onClick} />;
};
