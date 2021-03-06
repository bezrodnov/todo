import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseActionItem from './BaseActionItem';

import { project } from '../../../icons';
import { useRouter } from '../../../routes/PrivateRoute';

export default ({ task, actions, callback }) => {
  const { t } = useTranslation();
  const { history } = useRouter();

  const title = t('taskActions.project.title');
  const description = t('taskActions.project.description');
  const onClick = () => history.push(`/project/${task._id}`);

  return <BaseActionItem title={title} description={description} icon={project} onClick={onClick} />;
};
