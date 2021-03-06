import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { reference } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.reference.title');
  const description = t('taskActions.reference.description');
  const onClick = () => actions.markAsReference(task, callback);

  return <BaseActionItem title={title} description={description} icon={reference} onClick={onClick} />;
};
