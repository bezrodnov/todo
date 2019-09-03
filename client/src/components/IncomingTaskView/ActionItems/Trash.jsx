import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { trash } from '../../../icons';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();

  const title = t('taskActions.trash.title');
  const description = t('taskActions.trash.description'); // TODO: add description to i18n
  const onClick = () => actions.markAsTrash(task, callback);

  return <BaseActionItem title={title} description={description} icon={trash} onClick={onClick} />;
};
