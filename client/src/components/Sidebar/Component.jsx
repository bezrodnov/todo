import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ArrowRight from '@material-ui/icons/ArrowRight';

import CreateTaskItem from './CreateTaskItem';
import IncomingTaskItem from './IncomingTaskItem';
import TrashTaskItem from './TrashTaskItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sideBar: {
    overflow: 'hidden',
    background: theme.palette.primary.main,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    width: theme.spacing(8),
    '&$expanded': {
      width: theme.spacing(24),
    },
  },
  arrowButton: {
    color: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  arrow: {
    margin: -5,
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    '&$expanded': {
      transform: 'rotate(-180deg)',
    },
  },
  expanded: {},
}));

const Sidebar = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(!!localStorage.getItem(EXPAND_SIDEBAR_LOCAL_STORAGE_KEY));

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) {
      localStorage.removeItem(EXPAND_SIDEBAR_LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(EXPAND_SIDEBAR_LOCAL_STORAGE_KEY, 1);
    }
  };

  const expandClass = { [classes.expanded]: expanded };

  const arrows = count =>
    new Array(count)
      .fill('')
      .map((el, index) => <ArrowRight key={index} className={clsx(classes.arrow, expandClass)} />);

  return (
    <Box className={clsx(classes.sideBar, expandClass)} boxShadow={3}>
      <Button onClick={toggleExpand} className={classes.arrowButton} disableRipple>
        {arrows(2)}
      </Button>
      <Divider />
      <List>
        <CreateTaskItem expanded={expanded} />
        <IncomingTaskItem expanded={expanded} />
        <TrashTaskItem expanded={expanded} />
      </List>
      <Divider />
    </Box>
  );
};

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  incomingTaskCount: PropTypes.number,
  trashTaskCount: PropTypes.number,
};

export default Sidebar;

const EXPAND_SIDEBAR_LOCAL_STORAGE_KEY = 'expandSideBar';
