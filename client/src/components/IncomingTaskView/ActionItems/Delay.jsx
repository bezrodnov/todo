import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { delay } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.delay.title');
  const description = t('taskActions.delay.description');
  const onClick = () => actions.markAsDelayed(task, callback); // TODO: review

  return <BaseActionItem title={title} description={description} icon={delay} onClick={onClick} />;
};
