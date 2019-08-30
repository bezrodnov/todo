import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1.5, 2, 1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 1, 1),
    },
    '&$focused': {
      background: theme.palette.primary.light,
    },
  },
  listItemIcon: {
    color: theme.palette.background.default,
  },
  listItemText: {
    color: theme.palette.background.default,
    whiteSpace: 'nowrap',
    margin: 0,
  },
  focused: {},
}));

const AbstractSidebarItem = ({ expanded, onClick, text, count, isFocused, icon, svgIconPath }) => {
  const classes = useStyles();

  const className = clsx(classes.listItem, { [classes.focused]: isFocused });

  const iconEl = icon || (
    <SvgIcon>
      <path d={svgIconPath} />
    </SvgIcon>
  );

  return (
    <ListItem button onClick={onClick} className={className}>
      <ListItemIcon className={classes.listItemIcon}>
        <Tooltip title={expanded ? '' : text} placement="right">
          <Badge badgeContent={count} color="secondary">
            {iconEl}
          </Badge>
        </Tooltip>
      </ListItemIcon>
      <ListItemText className={classes.listItemText} primary={expanded ? text : ''} />
    </ListItem>
  );
};

AbstractSidebarItem.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
  text: PropTypes.string,
  count: PropTypes.number,
};

export default AbstractSidebarItem;
