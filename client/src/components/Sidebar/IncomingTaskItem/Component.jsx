import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import MailIcon from '@material-ui/icons/Mail';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    '&$focused': {
      background: theme.palette.primary.light,
    },
  },
  listItemIcon: {
    color: theme.palette.background.default,
  },
  listItemText: {
    color: theme.palette.background.default,
  },
  focused: {},
}));

const PATH = '/incoming';

const IncomingTaskItem = ({ taskCount, history, location, expanded }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const goToIncoming = () => history.push(PATH);

  const isFocused = location.pathname === PATH;
  const className = clsx(classes.listItem, { [classes.focused]: isFocused });

  return (
    <ListItem button onClick={goToIncoming} className={className}>
      <ListItemIcon className={classes.listItemIcon}>
        <Tooltip title={expanded ? '' : t('navigation.sidebar.inbox')} placement="right">
          <Badge badgeContent={taskCount} color="secondary">
            <MailIcon />
          </Badge>
        </Tooltip>
      </ListItemIcon>
      <ListItemText
        primary={t('navigation.sidebar.inbox')}
        primaryTypographyProps={{ className: classes.listItemText }}
      />
    </ListItem>
  );
};

IncomingTaskItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  taskCount: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default IncomingTaskItem;
