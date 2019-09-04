import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { finished } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.now.title');
  const description = t('taskActions.now.description');
  const onClick = () => actions.markAsFinished(task, callback);

  return <BaseActionItem title={title} description={description} icon={finished} onClick={onClick} />;
};
