import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1.25, 2, 1.25),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5, 1, 1),
    },
    '&$focused': {
      background: theme.palette.primary.light,
    },
    '&:not($expanded) $counter': {
      transform: 'scale(0)',
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
  counter: {
    width: theme.spacing(4.5),
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: theme.spacing(0.25, 0),
    borderRadius: theme.spacing(1.5),
    transition: theme.transitions.create('transform'),
    transform: 'scale(1)',
  },
  focused: {},
  expanded: {},
}));

const AbstractSidebarItem = ({ expanded, onClick, text, count, isFocused, icon }) => {
  const classes = useStyles();

  const className = clsx(classes.listItem, {
    [classes.focused]: isFocused,
    [classes.expanded]: expanded,
  });

  return (
    <ListItem button onClick={onClick} className={className}>
      <ListItemIcon className={classes.listItemIcon}>
        <Tooltip title={expanded ? '' : text} placement="right">
          <Badge badgeContent={!expanded ? count : 0} color="secondary">
            {icon}
          </Badge>
        </Tooltip>
      </ListItemIcon>
      <ListItemText className={classes.listItemText} primary={expanded ? text : ''} />
      {count > 0 && <span className={classes.counter}>{count}</span>}
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
