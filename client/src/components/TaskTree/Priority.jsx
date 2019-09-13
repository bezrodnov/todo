import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './styles';

const Priority = ({ priority, ...other }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const className = clsx(classes.taskPriority, classes[`${priority || 'unset'}Priority`]);
  return (
    <Tooltip title={t(`priorities.${priority || 'unset'}`)} placement="left">
      <span className={className} {...other} />
    </Tooltip>
  );
};

export default React.memo(Priority);
